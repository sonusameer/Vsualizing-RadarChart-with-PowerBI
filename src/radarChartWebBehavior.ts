module powerbi.extensibility.visual {
    // d3
    import Selection = d3.Selection;

    // powerbi.extensibility.utils.interactivity
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    import IInteractiveBehavior = powerbi.extensibility.utils.interactivity.IInteractiveBehavior;
    import ISelectionHandler = powerbi.extensibility.utils.interactivity.ISelectionHandler;

    export interface RadarChartBehaviorOptions {
        selection: Selection<SelectableDataPoint>;
        clearCatcher: Selection<any>;
        hasHighlights: boolean;
    }

    export class RadarChartWebBehavior implements IInteractiveBehavior {
        private selection: Selection<SelectableDataPoint>;
        private hasHighlights: boolean;

        public bindEvents(options: RadarChartBehaviorOptions, selectionHandler: ISelectionHandler): void {
            const clearCatcher: Selection<any> = options.clearCatcher;

            this.selection = options.selection;
            this.hasHighlights = options.hasHighlights;

            this.selection.on("click", (dataPoint: SelectableDataPoint) => {
                const mouseEvent: MouseEvent = d3.event as MouseEvent;

                selectionHandler.handleSelection(dataPoint, mouseEvent.ctrlKey);

                mouseEvent.stopPropagation();
            });

            clearCatcher.on("click", () => {
                selectionHandler.handleClearSelection();
            });
        }

        public renderSelection(hasSelection: boolean): void {
            this.selection.style("opacity", (dataPoint: RadarChartDatapoint) => {
                return radarChartUtils.getFillOpacity(
                    dataPoint.selected,
                    dataPoint.highlight,
                    !dataPoint.highlight && hasSelection,
                    !dataPoint.selected && this.hasHighlights);
            });
        }
    }
}
