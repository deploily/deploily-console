import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResizeObserver from 'resize-observer-polyfill';

import { MainSideBar, MainSideBarMobile } from '@/app/[locale]/(auth)/portal/components/sideBar';

// Mock ResizeObserver
global.ResizeObserver = ResizeObserver;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});


// Mock translations
jest.mock("../../../../../../locales/client", () => ({
  useI18n: () => (key: string) => `translated-${key}`,
  useScopedI18n: () => (key: string) => `translated-${key}`,
}));


// TESTS

describe("MainSideBar", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<MainSideBar />);
    });

  });

  test("renders sidebar with menu items", async () => {
    expect(screen.getByText("translated-collapse")).toBeInTheDocument();
  });

  test("toggles sidebar collapse state on button click", async () => {
    // Click to collapse
    const toggleButton = screen.getByText("translated-collapse");
    fireEvent.click(toggleButton);
    // Check that collapse button text disappears (it should not be in document)
    expect(screen.queryByText("translated-collapse")).not.toBeInTheDocument();
  });
});


describe("MainSideBarMobile", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<MainSideBarMobile />);
    });
  });

  test("renders on-demand button", async () => {
    expect(screen.getByText("translated-ondemand")).toBeInTheDocument();
  });

  test("on-demand button links to /portal/home", async () => {
    const link = screen.getByText("translated-ondemand").closest("a");
    expect(link).toHaveAttribute("href", "/portal/home");
  });

});

