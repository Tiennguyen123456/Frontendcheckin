export type EventConfigMainFieldItem = {
  fieldName: string;
  description: string;
  config: {
    pc: {
      display: boolean;
      bold: boolean;
      italic: boolean;
      font: string;
      fontSize: string;
      width: string;
      color: string;
      align: string;
      alignHorizontal: string;
      alignVertical: string;
    };
    pda: {
      display: boolean;
      bold: boolean;
      italic: boolean;
      font: string;
      fontSize: string;
      width: string;
      color: string;
      align: string;
      alignHorizontal: string;
      alignVertical: string;
    };
  };
};

export type EventConfigFieldType = {
  field: string;
  desc: string;
  order: number;
  is_main: boolean;
  attributes: {
    desktop: {
      [x: string]: boolean | string | number;
    };
    mobile: {
      [x: string]: boolean | string | number;
    };
    tablet: {
      [x: string]: boolean | string | number;
    };
  };
};

type EventFieldConfigType = {
  type: string;
  rule?: string;
  default?: string | boolean | number;
  options?: any;
};

export type EventConfigTemplateType = {
  field: EventFieldConfigType;
  desc: EventFieldConfigType;
  order: EventFieldConfigType;
  is_main: EventFieldConfigType;
  attributes: {
    desktop: {
      [x: string]: EventFieldConfigType;
    };
    mobile: {
      [x: string]: EventFieldConfigType;
    };
    tablet: {
      [x: string]: EventFieldConfigType;
    };
  };
};

export type AttributeFieldType = {
  desktop: {
    [x: string]: boolean | string | number;
  };
  mobile: {
    [x: string]: boolean | string | number;
  };
  tablet: {
    [x: string]: boolean | string | number;
  };
};
