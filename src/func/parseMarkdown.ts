export function parseMenuToMarkdown(menu: string): string {
  // 살구잼파이/쌀밥/차돌콩비지찌개/김말이튀김강정/햄마늘쫑볶음/오이김치/무화과리코타치즈샐러드/시리얼2종(첵스초코/시리얼)/우유,저지방우유,두유,과채주스2종1택/비타씨 -> ['살구잼파이', '쌀밥', '차돌콩비지찌개', '김말이튀김강정', '햄마늘쫑볶음', '오이김치', '무화과라코타치즈샐러드', '시리얼2종(첵스초코/시리얼)', '우유, 저지방우유,두유,과채주스2종1택', '비타씨']
  // /를 기준으로 각 메뉴 구분.
  // 만약 () 안에 /가 있다면 무시.

  const menuList = menu.split("/").map((menu) => {
    // 괄호 안에 있는 /는 무시.
    const menuWithoutParentheses = menu.replace(/\([^)]+\)/g, "");
    return menuWithoutParentheses.trim();
  });

  for (const index in menuList) {
    // 맨 앞에 *를 붙여줌.
    menuList[index] = `* ${menuList[index]}`;
  }

  return menuList.join("\n");
}
