export const IMAGE_CONVERT_MESSAGES = {
  UNKNOWN_ARG: (arg: string) => `\n❌ 알 수 없는 인자: ${arg}\n`,

  WIDTH_NOT_ALLOWED: (width: number) => `\n❌ 허용되지 않는 너비: ${width}w`,
  WIDTH_RULES: (allowed: string) => `🔴 허용 규격: [${allowed}]\n`,

  VARIANT_WIDTH_MISMATCH: (variant: string, width: number, allowed: string) =>
    `\n❌ 규격 불일치: ${variant} / ${width}w\n🔴 ${variant} 허용 규격: [${allowed}]\n`,
  UNAUTHORIZED_WIDTH: (width: number) =>
    `\n❌ width(${width}w) 단독 지정은 허용되지 않습니다. variant를 명시해주세요.\n`,

  FILE_NOT_FOUND: (file: string) => `\n❌ 파일을 찾을 수 없습니다: ${file}\n`,
  FILE_TASK_FAILED: (reason: unknown) => `  ❌ 파일 처리 실패: ${reason}\n`,

  CONVERT_FAILED: (domain: string, name: string, reason: unknown) =>
    `  ❌ ${domain}/${name}  변환 실패: ${reason}`,
  CONVERT_START: (count: number) => `\n🚀 변환 시작 (총 ${count}개 파일)\n`,

  FINISH_PARTIAL: (successCount: number, failCount: number) =>
    `\n🏁 완료 — ✅ ${successCount}개 성공  ❌ ${failCount}개 실패`,
  FINISH_ALL: (successCount: number) => `\n🏁 완료 — ✅ ${successCount}개 모두 성공\n`,

  UNEXPECTED_ERROR: (error: unknown) => `\n💥 예상치 못한 에러: ${error}\n`,
  TERMINATED_WITH_ERROR: `⚠️ 오류로 인해 종료되었습니다.\n`,

  CONVERT_SUCCESS: (
    domain: string,
    name: string,
    variantKey: string,
    outputWidth: number,
    format: string,
    dimInfo: string,
    sizeInfo: string,
  ) =>
    `  ✅ ${domain}/${name}  [${variantKey} · ${outputWidth}w · ${format}]  ${dimInfo}  ${sizeInfo}`,
};
