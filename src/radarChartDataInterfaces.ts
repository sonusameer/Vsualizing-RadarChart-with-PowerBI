module powerbi.extensibility.visual {
    // d3
    import Arc = d3.svg.arc.Arc;

    // powerbi.extensibility.utils.chart.legend
    import LegendData = powerbi.extensibility.utils.chart.legend.LegendData;
    import PrimitiveValue = powerbi.PrimitiveValue;
    // powerbi.extensibility.utils.formatting
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;

    // powerbi.extensibility.utils.interactivity
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    import TooltipEnabledDataPoint = powerbi.extensibility.utils.tooltip.TooltipEnabledDataPoint;

    export interface RadarChartDatapoint extends SelectableDataPoint, TooltipEnabledDataPoint {
        x: number;
        y: number;
        y0?: number;
        color?: string;
        value?: number;
        tooltipInfo?: VisualTooltipDataItem[];
        labelFormatString?: string;
        labelFontSize?: string;
        highlight?: boolean;
        showPoint: boolean;
    }

    export interface RadarChartAxesLabel {
        x: number;
        y: number;
        color: string;
        labelFormatString: string;
        labelFontSize: string;
    }

    export interface RadarChartData {
        legendData: LegendData;
        labels: RadarChartLabelsData;
        series: RadarChartSeries[];
        settings: RadarChartSettings;
    }

    export interface RadarChartLabel extends Arc {
        text: string;
        index: number;
        x?: number;
        y?: number;
        angleInDegree?: number;
        xLinkBegin?: number;
        yLinkBegin?: number;
        xLinkEnd?: number;
        yLinkEnd?: number;
        textAnchor?: string;
        maxWidth?: number;
        isLabelHasConflict?: boolean;
        outsidePlacement?: number;
        hide?: boolean;
    }

    export interface RadarChartLabelsData {
        labelPoints: RadarChartLabel[];
        formatter: IValueFormatter;
    }

    export interface RadarChartSeries {
        fill: string;
        name: string;
        dataPoints: RadarChartDatapoint[];
        identity: ISelectionId;
        hasHighlights?: boolean;
    }

    export interface RadarChartCircularSegment {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }
}
