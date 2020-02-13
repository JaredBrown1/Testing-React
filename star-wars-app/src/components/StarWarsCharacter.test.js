import React from "react";

import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StarWarsCharacters from "./StarWarsCharacters";

test("that the next button loads", async () => {
  const wrapper = rtl.render(<StarWarsCharacters />);
  await wrapper.findByText(/Next/i);
  const nextArr = wrapper.getByText(/Next/i);
  rtl.act(() => {
    rtl.fireEvent.click(nextArr);
  });
  expect(wrapper.getByTestId("next-button")).not.toBeNull();
});

test("that the previous button loads", async () => {
  const wrapper = rtl.render(<StarWarsCharacters />);
  await wrapper.findByTestId("prev-button");
  const element = wrapper.getByText(/previous/i);
  expect(element).toBeVisible();
});
