import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppAppBar from '@/app/[locale]/components/appBar';
import ResizeObserver from 'resize-observer-polyfill';

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

// eslint-disable-next-line react/display-name
jest.mock("../../../../src/components/locale/localeSwitcher", () => () => <div data-testid="locale-switcher" />);

describe("AppAppBar", () => {
  test("renders without crashing", () => {
    render(<AppAppBar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("renders the LocaleSwitcher component", () => {
    render(<AppAppBar />);
    expect(screen.getByTestId("locale-switcher")).toBeInTheDocument();
  });
});
