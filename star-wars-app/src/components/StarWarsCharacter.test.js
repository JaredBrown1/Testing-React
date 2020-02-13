import React from "react";

import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StarWarsCharacters from "./StarWarsCharacters";
import App from "../App";
import axios from "axios";

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

test("heading is rendered", async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findByTestId("header");
  const element = wrapper.getByAltText(/logo/i);
  expect(element).toBeVisible();
});

test("names render", async () => {
  const wrapper = rtl.render(<StarWarsCharacters />);
  const names = await wrapper.findByTestId("char");
  expect(names).toBeVisible();
});

// API call test
test("api is called", async () => {
  const wrapper = rtl.render(<StarWarsCharacters />);
  await wrapper.findByTestId("char");
  expect(axios.get).toHaveBeenCalled();
});
