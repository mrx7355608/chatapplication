import { render, fireEvent, screen } from "@testing-library/react";
import ThemeSelector from "@/components/theme-selector";

jest.mock("lucide-react", () => ({
    // eslint-disable-next-line
    Palette: (props: any) => <div data-testid="mock-icon" {...props} />,
}));

describe("ThemeSelector", () => {
    beforeEach(() => {
        Storage.prototype.setItem = jest.fn();
        Storage.prototype.getItem = jest.fn().mockReturnValue(null);
    });

    it("should update the main html tag's attribute data-theme to the selected theme", () => {
        render(<ThemeSelector />);

        const draculaThemeButton = screen.getByLabelText("Cyberpunk");

        fireEvent.click(draculaThemeButton);

        expect(document.documentElement.getAttribute("data-theme")).toBe(
            "cyberpunk"
        );
    });

    it("should create/update a cookie when the theme is updated", () => {
        render(<ThemeSelector />);

        const cyberpunkThemeButton = screen.getByLabelText("Cyberpunk");

        fireEvent.click(cyberpunkThemeButton);

        expect(document.cookie).toContain("current-theme");
    });
});
