module powerbi.extensibility.visual {
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;
    import LegendPosition = powerbi.extensibility.utils.chart.legend.LegendPosition;

    export class RadarChartSettings extends DataViewObjectsParser {
        public legend: LegendSettings = new LegendSettings();
        public labels: LabelSettings = new LabelSettings();
        public dataPoint: DataPointSettings = new DataPointSettings();
        public line: LineSettings = new LineSettings();
        public displaySettings: DisplaySettings = new DisplaySettings();
    }

    export class LegendSettings {
        public show: boolean = true;
        public showTitle: boolean = true;
        public titleText: string = "";
        public labelColor: string = "black";
        public fontSize: number = 8;
        public position: string = LegendPosition[LegendPosition.Top];
    }

    export class DataPointSettings {
        public fill: string = "";
    }

    export class LabelSettings {
        public show: boolean = true;
        public color: string = "#000";
        public fontSize: number = 8;
    };

    export class LineSettings {
        public show: boolean = false;
        public lineWidth: number = 5;
    }

    export class DisplaySettings {
        public minValue: number = 0;
        public axisBeginning: number = -1;
    }
}
