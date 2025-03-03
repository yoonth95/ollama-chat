from datetime import datetime, timezone, timedelta
from typing import Union

def convert_to_kst(dt: Union[datetime, None]) -> Union[str, None]:
  """
  UTC 시간을 KST(한국 표준시)로 변환하고 ISO 형식 문자열로 반환합니다.
  
  Args:
    dt: 변환할 datetime 객체 (UTC 기준)
      
  Returns:
    KST 시간대로 변환된 ISO 형식 문자열 또는 입력이 None인 경우 None
  """
  if dt is None:
    return None
      
  # UTC 시간대 정보가 없는 경우 UTC로 설정
  if dt.tzinfo is None:
    dt = dt.replace(tzinfo=timezone.utc)
  
  # UTC에서 KST(UTC+9)로 변환
  kst_time = dt.astimezone(timezone(timedelta(hours=9)))
  
  # ISO 형식 문자열로 반환
  return kst_time.isoformat()