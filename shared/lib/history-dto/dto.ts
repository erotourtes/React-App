export enum ActionType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export type HistoryT = {
  id: string;
  actionType: ActionType;
  timestamp: string;
  tableName: string;
  fieldName: string;
  oldValue: string;
  newValue: string;
  recordId: string;
};
