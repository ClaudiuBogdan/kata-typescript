declare type FrequencyMetrics = {
    count: number;
    lastDay: number;
};

declare type FrequencyMap = {
    [key: string]: FrequencyMetrics;
};

declare type MetaData = TemplateMetaData & {
    templatePath: string;
    freq: FrequencyMetrics;
};

declare type GenerateCallback = (items: MetaData[]) => void;
