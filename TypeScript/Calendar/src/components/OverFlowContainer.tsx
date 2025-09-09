import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";

type OverFlowContainerProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  renderOverflow: (overFlowAmount: number) => React.ReactNode;
  getKey: (item: T) => React.Key;
  className?: string;
};

export function OverFlowContainer<T>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: OverFlowContainerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overFlowAmount, setOverFlowAmount] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current === null) return;

    const observer = new ResizeObserver((entries) => {
      const containerElement = entries[0]?.target;
      if (containerElement === null) return;

      const children =
        containerElement.querySelectorAll<HTMLElement>("[data-item]");
      const overFlowElement =
        containerElement.parentElement?.querySelector<HTMLElement>(
          "[data-overflow]"
        );

      if (overFlowAmount != null && overFlowElement) overFlowElement.style.display = "none";
      children.forEach((child) => child.style.removeProperty("display"));

      let amount = 0;

      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (containerElement.scrollHeight <= containerElement.clientHeight)
          break;
        amount = children.length - i;
        child.style.display = "none";
        if (overFlowElement) overFlowElement.style.removeProperty("display");
      }

      setOverFlowAmount(amount);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map((item) => (
          <div data-item key={getKey(item)}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div data-overflow>{renderOverflow(overFlowAmount)}</div>
    </>
  );
}
