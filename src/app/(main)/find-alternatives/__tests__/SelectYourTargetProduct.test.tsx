import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SelectYourTargetProduct from "../_components/SelectYourTargetProduct";
import { useRouter } from "next/navigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the Combobox component
jest.mock("@/components/common/Combobox", () => ({
  Combobox: ({ options, placeholder, value, onChange }) => (
    <div>
      <button
        data-testid={`${placeholder.toLowerCase().replace(" ", "-")}-button`}
      >
        {value ? value.label : placeholder}
      </button>
      <ul data-testid={`${placeholder.toLowerCase().replace(" ", "-")}-list`}>
        {options.map((option) => (
          <li
            key={option.value}
            data-testid={`${option.value}-option`}
            onClick={() => onChange(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  ),
}));

const mockStore = configureStore([]);

describe("SelectYourTargetProduct", () => {
  let store;
  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    store = mockStore({
      product: {
        findAlternatives: {
          brand: "",
          product: "",
        },
      },
    });
  });

  it("should render the brand and product comboboxes", () => {
    render(
      <Provider store={store}>
        <SelectYourTargetProduct />
      </Provider>
    );

    expect(screen.getByTestId("select-brand-button")).toBeInTheDocument();
    expect(screen.getByTestId("select-product-button")).toBeInTheDocument();
  });

  it("should update the brand in the store when a brand is selected", () => {
    render(
      <Provider store={store}>
        <SelectYourTargetProduct />
      </Provider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId("select-brand-button"));
      fireEvent.click(screen.getByTestId("brand1-option"));
    });

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "product/setFindAlternatives",
        payload: { key: "brand", value: "brand1" },
      },
    ]);
  });

  it("should update the product in the store when a product is selected", () => {
    render(
      <Provider store={store}>
        <SelectYourTargetProduct />
      </Provider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId("select-product-button"));
      fireEvent.click(screen.getByTestId("Product1-option"));
    });

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "product/setFindAlternatives",
        payload: { key: "product", value: "Product1" },
      },
    ]);
  });

  it("should navigate to the alternatives page when both brand and product are selected", () => {
    store = mockStore({
      product: {
        findAlternatives: {
          brand: "brand1",
          product: "Product1",
        },
      },
    });

    render(
      <Provider store={store}>
        <SelectYourTargetProduct />
      </Provider>
    );

    expect(pushMock).toHaveBeenCalledWith(
      "/find-alternatives/top-alternatives-for-you"
    );
  });
});
