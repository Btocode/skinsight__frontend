import { renderHook } from "@testing-library/react";
import useIsClient from "../useIsClient";

describe("useIsClient", () => {
  /**
   * Test case: Returns true initially on server-side
   *
   * This test verifies that the hook returns `true` when initially rendered
   * to ensure it behaves correctly on the server-side.
   */
  it("should return true initially on server-side", () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(true);
  });
});
