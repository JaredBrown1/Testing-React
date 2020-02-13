import React from "react";

import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StarWarsCharacters from "./StarWarsCharacters";
import axios from "axios";

// test("that the next button loads", async () => {
//   const wrapper = rtl.render(<StarWarsCharacters />);
//   await wrapper.findByText(/Next/i);
//   const nextArr = wrapper.getByText(/Next/i);
//   rtl.act(() => {
//     rtl.fireEvent.click(nextArr);
//   });
//   expect(wrapper.getByTestId("next-button")).not.toBeNull();
// });

// test("that the previous button loads", async () => {
//   const wrapper = rtl.render(<StarWarsCharacters />);
//   await wrapper.findByTestId("prev-button");
//   const element = wrapper.getByText(/previous/i);
//   expect(element).toBeVisible();
// });

jest.mock("axios", () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          count: 0,
          next: "",
          previous: null,
          results: [{}]
        }
      })
    )
  };
});

test("characters are loaded from api", async () => {
  const wrapper = rtl.render(<StarWarsCharacters />);
  await wrapper.findByTestId("char");
  expect(axios.get).toHaveBeenCalled();
});
