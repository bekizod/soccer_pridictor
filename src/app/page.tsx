/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import GradientText from "./BlurText";

interface TeamStats {
  home_team_possession: number;
  home_team_shots_on_target: number;
  home_team_yellow_cards: number;
  home_team_red_cards: number;
  home_team_goal_count: number;
  home_team_fouls: number;
}

// interface PredictionResponse {
//   prediction: string;
// }

const FootballPrediction = () => {
  const [homeTeam, setHomeTeam] = useState<TeamStats>({
    home_team_possession: 55,
    home_team_shots_on_target: 6,
    home_team_yellow_cards: 2,
    home_team_red_cards: 0,
    home_team_goal_count: 1,
    home_team_fouls: 10,
  });

  const [awayTeam, setAwayTeam] = useState<any>({
    home_team_possession: 45,
    home_team_shots_on_target: 4,
    away_team_yellow_cards: 3,
    away_team_red_cards: 1,
    away_team_goal_count: 2,
    away_team_fouls: 12,
  });

  const [prediction, setPrediction] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle the API request
  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://test-sjrn.onrender.com/predict_match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            home_team: homeTeam,
            away_team: awayTeam,
          }),
        }
      );

      if (!response.ok) {
        // console.log(JSON.stringify(response, null, 2));
      }

      // const data: PredictionResponse = await response.json();

      const data = await response.json();

      console.log(JSON.stringify(data, null, 2));

      setPrediction(data.prediction);
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
      style={{
        backgroundImage: "url('/footballbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <BlurText
        text="Football Match Prediction"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-6xl shadow-xl mb-8"
      /> */}
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class text-6xl py-2"
      >
        Football Match Prediction
      </GradientText>
      {/* <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Football Match Prediction
      </h1> */}

      <div className="flex flex-row gap-6 w-full  justify-center">
        <div>
          {" "}
          <div className="  bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/30">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class font-bold text-3xl py-2"
            >
              Match Stats
            </GradientText>

            {/* Home and Away Team Container */}
            <div className="flex gap-8">
              {/* Home Team */}
              <div className="flex-1">
                <h3 className="text-xl text-blue-500 font-extrabold mb-4">
                  Home Team
                </h3>
                <div className="space-y-4 text-black">
                  <div>
                    <label className="block text-sm text-gray-900">
                      Possession
                    </label>
                    <input
                      type="number"
                      value={homeTeam.home_team_possession}
                      onChange={(e) =>
                        setHomeTeam({
                          ...homeTeam,
                          home_team_possession: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">
                      Shots on Target
                    </label>
                    <input
                      type="number"
                      value={homeTeam.home_team_shots_on_target}
                      onChange={(e) =>
                        setHomeTeam({
                          ...homeTeam,
                          home_team_shots_on_target: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">
                      Yellow Cards
                    </label>
                    <input
                      type="number"
                      value={homeTeam.home_team_yellow_cards}
                      onChange={(e) =>
                        setHomeTeam({
                          ...homeTeam,
                          home_team_yellow_cards: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">
                      Red Cards
                    </label>
                    <input
                      type="number"
                      value={homeTeam.home_team_red_cards}
                      onChange={(e) =>
                        setHomeTeam({
                          ...homeTeam,
                          home_team_red_cards: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">
                      Goal Count
                    </label>
                    <input
                      type="number"
                      value={homeTeam.home_team_goal_count}
                      onChange={(e) =>
                        setHomeTeam({
                          ...homeTeam,
                          home_team_goal_count: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">Fouls</label>
                    <input
                      type="number"
                      value={homeTeam.home_team_fouls}
                      onChange={(e) =>
                        setHomeTeam({
                          ...homeTeam,
                          home_team_fouls: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex-1">
                <h3 className="text-xl text-red-500 font-extrabold mb-4">
                  Away Team
                </h3>
                <div className="space-y-4 text-black">
                  <div>
                    <label className="block text-sm text-gray-900">
                      Possession
                    </label>
                    <input
                      type="number"
                      value={awayTeam.home_team_possession}
                      onChange={(e) =>
                        setAwayTeam({
                          ...awayTeam,
                          home_team_possession: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">
                      Shots on Target
                    </label>
                    <input
                      type="number"
                      value={awayTeam.home_team_shots_on_target}
                      onChange={(e) =>
                        setAwayTeam({
                          ...awayTeam,
                          home_team_shots_on_target: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">
                      Yellow Cards
                    </label>
                    <input
                      type="number"
                      value={awayTeam.away_team_yellow_cards}
                      onChange={(e) =>
                        setAwayTeam({
                          ...awayTeam,
                          away_team_yellow_cards: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">
                      Red Cards
                    </label>
                    <input
                      type="number"
                      value={awayTeam.away_team_red_cards}
                      onChange={(e) =>
                        setAwayTeam({
                          ...awayTeam,
                          away_team_red_cards: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">
                      Goal Count
                    </label>
                    <input
                      type="number"
                      value={awayTeam.away_team_goal_count}
                      onChange={(e) =>
                        setAwayTeam({
                          ...awayTeam,
                          away_team_goal_count: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-900">Fouls</label>
                    <input
                      type="number"
                      value={awayTeam.away_team_fouls}
                      onChange={(e) =>
                        setAwayTeam({
                          ...awayTeam,
                          away_team_fouls: +e.target.value,
                        })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction Button */}
            <div className="mt-8">
              <button
                onClick={handlePredict}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                {loading ? (
                  <GradientText
                    colors={[
                      "#40ffaa",
                      "#4079ff",
                      "#40ffaa",
                      "#4079ff",
                      "#40ffaa",
                    ]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class font-bold text-xl py-2"
                  >
                    Predicting...
                  </GradientText>
                ) : (
                  <GradientText
                    colors={[
                      "#40ffaa",
                      "#4079ff",
                      "#40ffaa",
                      "#4079ff",
                      "#40ffaa",
                    ]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class font-bold text-xl py-2"
                  >
                    Get Predicting
                  </GradientText>
                )}
              </button>
            </div>

            {/* Prediction Result */}
            {prediction && (
              <div
                className={`text-xl font-bold mt-6 p-4  border-2  rounded-lg shadow-lg ${
                  prediction === "Draw"
                    ? "text-black bg-gray-300 border-gray-300"
                    : prediction === "Home Team Wins"
                    ? "text-blue-600 bg-blue-100 border-blue-300"
                    : prediction === "Away Team Wins"
                    ? "text-red-600 bg-red-100 border-red-300"
                    : "" // Optional: handle unexpected values if needed
                }`}
              >
                Prediction Result:{" "}
                <span
                  className={`text-xl ${
                    prediction === "Home Team Wins"
                      ? "text-blue-600"
                      : prediction === "Draw"
                      ? "text-black"
                      : "text-red-600"
                  }`}
                >
                  {prediction}
                </span>
              </div>
            )}

            {/* Error Handling */}
            {error && !loading && (
              <div className="mt-6 text-red-600 text-lg font-semibold">
                <p>Error: {error}</p>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex w-1/2 flex-col items-center justify-center  bg-transparent p-6"
          // style={{
          //   backgroundImage: "url('/icon.png')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          // }}
        ></div>
      </div>
    </div>
  );
};

export default FootballPrediction;
