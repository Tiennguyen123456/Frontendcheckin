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
