import { Component, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Router } from '@angular/router';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  private chart: am4maps.MapChart;

  constructor(private router: Router) {}

  ngAfterViewInit() {

    this.chart = am4core.create('chartdiv', am4maps.MapChart); // Create map instance
    this.chart.geodata = am4geodata_worldLow; // Set map definition
    this.chart.projection = new am4maps.projections.Miller(); // Set projection

    // Creating polygon series and loading data
    const polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries()); // Create polygon series
    polygonSeries.exclude = ['AQ']; // Exclude some things (here, Antartica)
    polygonSeries.useGeodata = true; // Make map to load polygon data from  GeoJson

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template; // Get template for polygon series
    polygonTemplate.tooltipText = '{name}'; // Set tooltype property
    polygonTemplate.polygon.fillOpacity = 0.6;
    polygonTemplate.fill = am4core.color('#74B267');
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#74X999');

    // LOG testing
    polygonTemplate.events.on('hit', (country) => {

      const countryProp: string[] = [];
      const countryData = country.target.dataItem.dataContext;

      for (const element in countryData) {
        if (countryData.hasOwnProperty(element)) {
          countryProp.push(countryData[element]);
        }
      }

      console.log(countryProp[3]);

    });

  }

  ngOnDestroy() {

    if (this.chart) {
      this.chart.dispose();
    }

  }
}
