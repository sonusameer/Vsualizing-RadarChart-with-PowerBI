module powerbi.extensibility.visual.tooltipBuilder {
    // powerbi.extensibility.utils.formatting
    import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
    import PrimitiveValue = powerbi.PrimitiveValue;
    const DefaultSeriesIndex: number = 0;
    const HighlightedValueDisplayName: string = "Highlighted";
    const DefaultDisplayName: string = "";
    const DisplayNameSeparator: string = "/";

    export interface TooltipCategoryDataItem {
        value?: PrimitiveValue;
        metadata: DataViewMetadataColumn[];
    }

    export interface TooltipSeriesDataItem {
        value?: PrimitiveValue;
        highlightedValue?: PrimitiveValue;
        metadata: DataViewValueColumn;
    }

    export function createTooltipInfo(
        dataViewCat: DataViewCategorical,
        categoryValue: PrimitiveValue,
        value?: PrimitiveValue,
        seriesIndex?: number): VisualTooltipDataItem[] {

        let categorySource: TooltipCategoryDataItem,
            seriesSource: TooltipSeriesDataItem[] = [],
            valuesSource: DataViewMetadataColumn = undefined;

        seriesIndex = seriesIndex | DefaultSeriesIndex;

        let categoriesData: DataViewCategoricalColumn[] = dataViewCat && dataViewCat.categories;

        if (categoriesData && categoriesData.length > 0) {
            if (categoriesData.length > 1) {
                let compositeCategoriesData: DataViewMetadataColumn[] = [];

                for (let i: number = 0, ilen: number = categoriesData.length; i < ilen; i++) {
                    compositeCategoriesData.push(categoriesData[i].source);
                }

                categorySource = {
                    value: categoryValue,
                    metadata: compositeCategoriesData
                };
            }
            else {
                categorySource = {
                    value: categoryValue,
                    metadata: [categoriesData[0].source]
                };
            }
        }

        if (dataViewCat && dataViewCat.values) {
            if (!categorySource || !(categorySource.metadata[0] === dataViewCat.values.source)) {
                valuesSource = dataViewCat.values.source;
            }

            if (dataViewCat.values.length > 0) {
                const valueColumn: DataViewValueColumn = dataViewCat.values[seriesIndex];
                seriesSource.push({
                        value,
                        highlightedValue: undefined,
                        metadata: valueColumn
                });

            }

            return createTooltipData(
                categorySource,
                valuesSource,
                seriesSource);
        }
    }

    function createTooltipData(
        categoryValue: TooltipCategoryDataItem,
        valuesSource: DataViewMetadataColumn,
        seriesValues: TooltipSeriesDataItem[]): VisualTooltipDataItem[] {

        const items: VisualTooltipDataItem[] = [];

        if (categoryValue) {
            if (categoryValue.metadata.length > 1) {
                let displayName: string = DefaultDisplayName;

                for (let i: number = 0, ilen: number = categoryValue.metadata.length; i < ilen; i++) {
                    if (i !== 0) {
                        displayName += DisplayNameSeparator;
                    }

                    displayName += categoryValue.metadata[i].displayName;
                }

                let categoryFormattedValue: string = getFormattedValue(
                    categoryValue.metadata[0],
                    categoryValue.value);

                items.push({
                    displayName,
                    value: categoryFormattedValue
                });
            }
            else {
                let categoryFormattedValue: string = getFormattedValue(
                    categoryValue.metadata[0],
                    categoryValue.value);

                items.push({
                    displayName: categoryValue.metadata[0].displayName,
                    value: categoryFormattedValue
                });
            }
        }

        if (valuesSource) {
            let dynamicValue: string;

            if (seriesValues.length > 0) {
                let dynamicValueMetadata: DataViewMetadataColumn = seriesValues[0].metadata.source;

                dynamicValue = getFormattedValue(
                    valuesSource,
                    dynamicValueMetadata.groupName);
            }

            items.push({
                displayName: valuesSource.displayName,
                value: dynamicValue
            });
        }

        for (let i: number = 0; i < seriesValues.length; i++) {
            let seriesData: TooltipSeriesDataItem = seriesValues[i];

            if (seriesData && seriesData.metadata) {
                let seriesMetadataColumn: DataViewMetadataColumn = seriesData.metadata.source,
                    value: PrimitiveValue = seriesData.value,
                    highlightedValue: PrimitiveValue = seriesData.highlightedValue;

                if (value || value === 0) {
                    let formattedValue: string = getFormattedValue(seriesMetadataColumn, value);

                    items.push({
                        displayName: seriesMetadataColumn.displayName,
                        value: formattedValue
                    });
                }

                if (highlightedValue || highlightedValue === 0) {
                    let formattedHighlightedValue: string = getFormattedValue(
                        seriesMetadataColumn,
                        highlightedValue);

                    items.push({
                        displayName: HighlightedValueDisplayName,
                        value: formattedHighlightedValue
                    });
                }
            }
        }

        return items;
    }

    export function getFormattedValue(column: DataViewMetadataColumn, value: PrimitiveValue): string {
        const formatString: string = getFormatStringFromColumn(column);

        return valueFormatter.format(value, formatString);
    }

    function getFormatStringFromColumn(column: DataViewMetadataColumn): string {
        if (column) {
            const formatString: string = valueFormatter.getFormatStringByColumn(column, true);

            return formatString || column.format;
        }

        return null;
    }
}
