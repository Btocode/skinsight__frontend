/* eslint-disable react/display-name */
import { render, screen, waitFor } from "@testing-library/react";
import YourSkinMatchesPage from "../page";
import { notFound } from "next/navigation";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("../_components/MatchesProductHeader", () => () => (
  <div>MatchesProductHeader</div>
));
jest.mock("../_components/MatchesProductFilter", () => () => (
  <div>MatchesProductFilter</div>
));
jest.mock("../_components/TonersProducts", () => ({ products }) => (
  <div>TonersProducts - {products ? "Loaded" : "Empty"}</div>
));
jest.mock("../_components/CleansersProducts", () => ({ products }) => (
  <div>CleansersProducts - {products ? "Loaded" : "Empty"}</div>
));
jest.mock("../_components/MoisturisersProducts", () => ({ products }) => (
  <div>MoisturisersProducts - {products ? "Loaded" : "Empty"}</div>
));
jest.mock("@/components/common/Advertisement", () => () => (
  <div>Advertisement</div>
));
jest.mock("@/components/common/GradientImage", () => () => (
  <div>GradientImage</div>
));
jest.mock("../_components/AddFavorite", () => () => <div>AddFavorite</div>);
jest.mock("@/components/common/Button", () => ({ children }) => (
  <button>{children}</button>
));

describe("YourSkinMatchesPage", () => {
  it("renders correctly when products are available", async () => {
    render(await YourSkinMatchesPage());

    await waitFor(() => {
      expect(screen.getByText("MatchesProductHeader")).toBeInTheDocument();
      expect(screen.getByText("MatchesProductFilter")).toBeInTheDocument();
      expect(screen.getByText("TonersProducts - Loaded")).toBeInTheDocument();
      expect(
        screen.getByText("CleansersProducts - Loaded")
      ).toBeInTheDocument();
      expect(
        screen.getByText("MoisturisersProducts - Loaded")
      ).toBeInTheDocument();
      expect(screen.getAllByText("Advertisement")).toHaveLength(2);
      expect(screen.getByText("GradientImage")).toBeInTheDocument();
      expect(screen.getByText("AddFavorite")).toBeInTheDocument();
    });
  });
});
