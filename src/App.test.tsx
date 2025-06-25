import { render, screen } from "@testing-library/react";
import App from "./App";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";

// Mock DOMPurify to prevent issues in JSDOM
vi.mock("dompurify", () => ({
  default: { sanitize: (html: string) => html }, // Simply return the HTML without sanitizing in tests
}));

interface TVShow {
  id: number;
  name: string;
  summary: string | null;
  premiered: string | null;
  genres: string[];
  image: { medium: string; original: string } | null;
}

interface TVShowSearchResult {
  score: number; // relevance score of the search result
  show: TVShow;
}

const theOffice: TVShow = {
  id: 526,
  name: "The Office",
  genres: ["Comedy"],
  premiered: "2005-03-24",
  image: {
    medium:
      "https://static.tvmaze.com/uploads/images/medium_portrait/481/1204342.jpg",
    original:
      "https://static.tvmaze.com/uploads/images/original_untouched/481/1204342.jpg",
  },
  summary:
    "<p>Steve Carell stars in <b>The Office</b>, a fresh and funny mockumentary-style glimpse into the daily interactions of the eccentric workers at the Dunder Mifflin paper supply company. Based on the smash-hit British series of the same name and adapted for American Television by Greg Daniels, this fast-paced comedy parodies contemporary American water-cooler culture. Earnest but clueless regional manager Michael Scott believes himself to be an exceptional boss and mentor, but actually receives more eye-rolls than respect from his oddball staff.</p>",
};

const TheSopranos = {
  id: 527,
  name: "The Sopranos",
  genres: ["Drama", "Crime"],
  premiered: "1999-01-10",
  image: {
    medium:
      "https://static.tvmaze.com/uploads/images/medium_portrait/4/11341.jpg",
    original:
      "https://static.tvmaze.com/uploads/images/original_untouched/4/11341.jpg",
  },
  summary:
    "<p><b>The Sopranos</b>, writer-producer-director David Chase's extraordinary television series, is nominally an urban gangster drama, but its true impact strikes closer to home: Like 1999's other screen touchstone, American Beauty, the HBO series chronicles a dysfunctional, suburban American family in bold relief. And for protagonist Tony Soprano, there's the added complexity posed by heading twin families, his collegial mob clan and his own, nouveau riche brood.</p>",
};

const search_results: Array<TVShowSearchResult> = [
  {
    score: 1.2,
    show: theOffice,
  },
  {
    score: 1.1,
    show: TheSopranos,
  },
];

describe("HomePage", () => {
  beforeAll(() => {
    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(search_results),
      } as Response)
    );
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("renders the main components of the page and initial search result", async () => {
    render(<App />);

    expect(await screen.findAllByText("The Office")).toHaveLength(2);
    expect(screen.getByRole("img")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "TV Show Search" })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search for a TV show/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText(/The Sopranos/)).toBeInTheDocument();
  });
});
