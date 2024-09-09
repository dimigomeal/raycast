export function parseMenuToMarkdown(menu: string): string {
  // /를 기준으로 각 메뉴 구분.
  // 만약 () 안에 /가 있다면 무시.

  const menuList = menu.split("/").map((menu) => {
    // 괄호 안에 있는 /는 무시.
    const menuWithoutParentheses = menu.replace(/\([^)]+\)/g, "");
    return menuWithoutParentheses.trim();
  });

  for (const index in menuList) {
    menuList[index] = `* ${menuList[index]}`;
  }

  return menuList.join("\n");
}
