import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResizeObserver from 'resize-observer-polyfill';

import { AppAppBarDesktop, AppAppBarMobile } from '@/app/[locale]/(auth)/portal/components/appBar';

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


// Mock useI18n to return a test function
jest.mock("../../../../../../locales/client", () => ({
  useI18n: () => (key: string) => `translated-${key}`, // Mock translation function
}));

// eslint-disable-next-line react/display-name
jest.mock("@/components/locale/localeSwitcher", () => () => <div data-testid="locale-switcher" />);


// Mock Ant Design Select (prevents selector issues)
jest.mock("antd", () => {
  const actualAnt = jest.requireActual("antd");
  return {
    ...actualAnt,
    Select: jest.fn(() => <div data-testid="mock-select" />),
  };
});

// TESTS

describe("AppAppBar Components", () => {
  test("renders AppAppBarDesktop without crashing", () => {
    render(<AppAppBarDesktop />);
    expect(screen.getByText("translated-ondemand")).toBeInTheDocument(); // Checks if the Header is rendered
  });

  test("renders AppAppBarMobile without crashing", () => {
    render(<AppAppBarMobile />);
    const logo = screen.getByAltText("logo-deploily");

    expect(logo).toBeInTheDocument();

    // Check that the button with "translated-ondemand" is NOT in the document
    const onDemandButton = screen.queryByText("translated-ondemand");
    expect(onDemandButton).not.toBeInTheDocument();
  });
});

