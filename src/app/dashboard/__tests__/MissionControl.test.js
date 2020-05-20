import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";

import { rootReducer, initialState as reducerInitialState } from "../../store";
import ThemeProvider from "../../component/ThemeProvider";
import theme from "../../../theme";
import MissionControl from "../";

const renderWithStoreAndRouter = (
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(rootReducer, initialState),
    route,
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route || ""]} initialIndex={0}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe("MissionControl", () => {
  it("should render", async () => {
    renderWithStoreAndRouter(<MissionControl />);

    // header
    expect(screen.getByText("Missions Control"));

    // navbar
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Missions")).toBeInTheDocument();
    expect(screen.getByText("Volunteer Home")).toBeInTheDocument();
    expect(screen.getByText("Resilience App")).toBeInTheDocument();
  });
});
