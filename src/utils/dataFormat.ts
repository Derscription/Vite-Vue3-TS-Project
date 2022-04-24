import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export function formatUtcString(utcString: string, format: string = "YYYY-MM-DD HH:mm:ss"): string {
  // utcOffset 偏移8个小时
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
