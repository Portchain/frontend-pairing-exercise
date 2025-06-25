import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DOMPurify from "dompurify";

interface TVShow {
  id: number;
  name: string;
  summary: string | null;
  premiered: string | null;
  genres: string[];
  image: { medium: string; original: string } | null;
  network?: {
    country: {
      name: string;
      code: string;
    };
  };
  webChannel?: {
    country: {
      name: string;
      code: string;
    };
  };
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

export default function PairingExerciseComponent() {
  // Search: https://api.tvmaze.com/search/shows?q=<query>
  const selectedShow = theOffice;
  const search_term = "the office";

  return (
    <div className="flex gap-6 min-h-screen items-start justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50 text-center">
            {selectedShow.name}
          </CardTitle>
          <div className="hidden justify-between">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <img
              src={selectedShow.image?.medium}
              alt={selectedShow.name}
              className="w-full h-auto rounded-md object-cover mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-50">
              Summary:
            </h3>
            <div
              className="text-sm text-gray-700 dark:text-gray-300 [&>p]:mb-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  selectedShow.summary || "<p>No summary available.</p>"
                ),
              }}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Genres: {selectedShow.genres.join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-7 text-gray-900 dark:text-gray-50 text-center">
          TV Show Search
        </h2>
        <form onSubmit={() => {}} className="flex space-x-2 mb-4">
          <Input
            type="text"
            name="search"
            placeholder="Search for a TV show (e.g., 'the office')"
            className="flex-grow"
            defaultValue={search_term}
          />
        </form>
        <>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-50">
            Search Results:
          </h3>
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            <li
              className={`p-3 rounded-md cursor-pointer transition-colors duration-200
                ${
                  selectedShow?.id === search_results[0].show.id
                    ? "bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-50 font-medium"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                }`}
            >
              {search_results[0].show.name} (
              {search_results[0].show.premiered
                ? new Date(search_results[0].show.premiered).getFullYear()
                : "N/A"}
              )
            </li>
            <li
              className={`p-3 rounded-md cursor-pointer transition-colors duration-200
                              ${
                                selectedShow?.id === search_results[1].show.id
                                  ? "bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-50 font-medium"
                                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                              }`}
            >
              {search_results[1].show.name} (
              {search_results[1].show.premiered
                ? new Date(search_results[1].show.premiered).getFullYear()
                : "N/A"}
              )
            </li>
          </ul>
        </>
      </div>
    </div>
  );
}
