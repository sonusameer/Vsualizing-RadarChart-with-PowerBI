module powerbi.extensibility.visual {
    export module radarChartUtils {
        export const DimmedOpacity: number = 0.4;
        export const DefaultOpacity: number = 1.0;

        export function getFillOpacity(
            selected: boolean,
            highlight: boolean,
            hasSelection: boolean,
            hasPartialHighlights: boolean): number {

            if ((hasPartialHighlights && !highlight) || (hasSelection && !selected)) {
                return DimmedOpacity;
            }

            return DefaultOpacity;
        }
    }
}
