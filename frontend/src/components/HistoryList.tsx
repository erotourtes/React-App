import { strDateFormat, strDateFormatMAT } from "@/utils/utils";
import { HistoryT, TaskT } from "@shared/dtos";
import { ActionType as HistoryActionType } from "@shared/dtos/lib/history-dto/dto";
import { CircleDot } from "lucide-react";

const HistoryList = ({ history }: { history: HistoryT[] }) => {
  if (!history || history.length == 0) return null;
  return (
    <div>
      <ul className="list-disc ml-5 space-y-5">
        {history.map((h) => (
          <History key={h.id} history={h} />
        ))}
      </ul>
    </div>
  );
};

const History = ({ history }: { history: HistoryT }) => {
  const { actionType, timestamp, tableName } = history;

  if (actionType === HistoryActionType.CREATE) {
    return (
      <li>
        <p>
          You created this {tableName}
          <span className="float-right">{strDateFormatMAT(timestamp)}</span>
        </p>
      </li>
    );
  }

  if (actionType === HistoryActionType.UPDATE) {
    return (
      <li>
        <div className="flex justify-between">
          <p>{taskRemapper[history.fieldName as keyof TaskT](history)}</p>
          <span className="float-right min-w-[150px]">
            {strDateFormatMAT(timestamp)}
          </span>
        </div>
      </li>
    );
  }

  return <div className="flex gap-2 p-2"></div>;
};

const value = (value: string) => {
  return (
    <span>
      <CircleDot className="inline-block h-4 w-4 mr-1" />
      <strong>{value}</strong>
    </span>
  );
};

const taskRemapper: Record<
  keyof TaskT,
  (history: HistoryT) => React.ReactElement
> = {
  id: () => <span></span>,
  name: (history: HistoryT) => {
    if (history.oldValue === "")
      return <span>You added name {value(history.tableName)}`</span>;
    return (
      <span>
        You renamed from {value(history.oldValue)} to {value(history.newValue)}{" "}
      </span>
    );
  },
  description: (history: HistoryT) =>
    !history.oldValue ? (
      <span>You added description {value(history.newValue)}</span>
    ) : (
      <span>
        You changed description from {value(history.oldValue)} to{" "}
        {value(history.newValue)}
      </span>
    ),
  list: (history: HistoryT) => {
    if (history.oldValue === "")
      return <span>You added list {value(history.newValue)}</span>;
    return (
      <span>
        You moved from list {value(history.oldValue)} to{" "}
        {value(history.newValue)}
      </span>
    );
  },
  priority: (history: HistoryT) =>
    !history.oldValue ? (
      <span>You added priority {value(history.newValue)}</span>
    ) : (
      <span>
        You changed priority from {value(history.oldValue)} to{" "}
        {value(history.newValue)}
      </span>
    ),
  dueDate: (history: HistoryT) =>
    !history.oldValue || history.oldValue === "" ? (
      <span>You added due date {value(strDateFormat(history.newValue))}</span>
    ) : (
      <span>
        You changed due date from {value(strDateFormat(history.oldValue))} to{" "}
        {value(strDateFormat(history.newValue))}
      </span>
    ),
};

export default HistoryList;
