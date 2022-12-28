import React from "react";
import { render, renderHook, act } from "@testing-library/react";
import { Landing } from "../client/pages/Landing";
import useCounter from "./testingHook";
import { describe, test } from "vitest";
describe("demo", () => {
  test("should be testable", ({ expect }) => {
    expect(1 + 1).toBe(2);
  });
  // test("should be able to test component", ({ expect }) => {
  //   const { getByText } = render(<Landing />);
  //   expect(getByText("образование")).toBeInTheDocument();
  // });
  test("should be able to test hook", ({ expect }) => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
