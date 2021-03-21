function removeAllSelected(parentEl) {
  const children = parentEl.children;

  Array.from(children).forEach((child) => {
    child.removeAttribute("selected");
  });
}

export { removeAllSelected };
