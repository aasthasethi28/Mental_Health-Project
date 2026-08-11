(() => {

  "use strict";


  // =========================================================
  // API
  // =========================================================

  const API_BASE =
    "http://127.0.0.1:2200";


  // =========================================================
  // ELEMENTS
  // =========================================================

  const form =
    document.getElementById(
      "predict-form"
    );

  const submitBtn =
    document.getElementById(
      "submit-btn"
    );

  const resetBtn =
    document.getElementById(
      "reset-btn"
    );

  const errorRetryBtn =
    document.getElementById(
      "error-retry-btn"
    );

  const stateIdle =
    document.getElementById(
      "state-idle"
    );

  const stateLoading =
    document.getElementById(
      "state-loading"
    );

  const stateResult =
    document.getElementById(
      "state-result"
    );

  const stateError =
    document.getElementById(
      "state-error"
    );

  const scoreNumberEl =
    document.getElementById(
      "score-number"
    );

  const scoreBandEl =
    document.getElementById(
      "score-band"
    );

  const scoreContextEl =
    document.getElementById(
      "score-context"
    );

  const gaugeFill =
    document.getElementById(
      "gauge-fill"
    );

  const errorCopyEl =
    document.getElementById(
      "error-copy"
    );


  const segGroup =
    document.getElementById(
      "stress_level_group"
    );

  const stressHiddenInput =
    document.getElementById(
      "stress_level"
    );


  const GAUGE_ARC_LENGTH = 314;


  // =========================================================
  // CHECK REQUIRED ELEMENTS
  // =========================================================

  if (
    !form ||
    !submitBtn ||
    !resetBtn ||
    !errorRetryBtn ||
    !stateIdle ||
    !stateLoading ||
    !stateResult ||
    !stateError
  ) {

    console.error(
      "Required HTML elements are missing."
    );

    return;

  }


  // =========================================================
  // DRAW GAUGE TICKS
  // =========================================================

  function drawTicks() {

    document
      .querySelectorAll(
        ".gauge-ticks"
      )
      .forEach((g) => {

        g.innerHTML = "";

        const cx = 120;
        const cy = 140;

        const rOuter = 100;
        const rInner = 90;


        for (
          let i = 0;
          i <= 10;
          i += 2
        ) {

          const angle =
            Math.PI -
            (i / 10) * Math.PI;


          const x1 =
            cx +
            rOuter *
            Math.cos(angle);

          const y1 =
            cy -
            rOuter *
            Math.sin(angle);


          const x2 =
            cx +
            rInner *
            Math.cos(angle);

          const y2 =
            cy -
            rInner *
            Math.sin(angle);


          const line =
            document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line"
            );


          line.setAttribute(
            "x1",
            x1.toFixed(1)
          );

          line.setAttribute(
            "y1",
            y1.toFixed(1)
          );

          line.setAttribute(
            "x2",
            x2.toFixed(1)
          );

          line.setAttribute(
            "y2",
            y2.toFixed(1)
          );


          g.appendChild(line);

        }

      });

  }


  drawTicks();


  // =========================================================
  // STRESS LEVEL
  // =========================================================

  if (segGroup) {

    segGroup
      .querySelectorAll(
        ".seg-btn"
      )
      .forEach((btn) => {

        btn.addEventListener(
          "click",
          () => {

            segGroup
              .querySelectorAll(
                ".seg-btn"
              )
              .forEach(
                (b) =>
                  b.classList.remove(
                    "active"
                  )
              );


            btn.classList.add(
              "active"
            );


            stressHiddenInput.value =
              btn.dataset.value;


            clearFieldError(
              stressHiddenInput
            );

          }
        );

      });

  }


  // =========================================================
  // FIELD WRAPPER
  // =========================================================

  function fieldWrapper(input) {

    if (!input) {
      return null;
    }

    return input.closest(
      ".field"
    );

  }


  // =========================================================
  // FIELD ERROR
  // =========================================================

  function setFieldError(
    input,
    message
  ) {

    const wrap =
      fieldWrapper(input);

    if (!wrap) {
      return;
    }


    wrap.classList.add(
      "field-error"
    );


    const msgEl =
      wrap.querySelector(
        ".error-msg"
      );


    if (msgEl) {

      msgEl.textContent =
        message;

    }

  }


  // =========================================================
  // CLEAR FIELD ERROR
  // =========================================================

  function clearFieldError(
    input
  ) {

    const wrap =
      fieldWrapper(input);

    if (!wrap) {
      return;
    }


    wrap.classList.remove(
      "field-error"
    );


    const msgEl =
      wrap.querySelector(
        ".error-msg"
      );


    if (msgEl) {

      msgEl.textContent = "";

    }

  }


  // =========================================================
  // CLEAR ALL ERRORS
  // =========================================================

  function clearAllErrors() {

    form
      .querySelectorAll(
        ".field"
      )
      .forEach(
        (field) =>
          field.classList.remove(
            "field-error"
          )
      );


    form
      .querySelectorAll(
        ".error-msg"
      )
      .forEach(
        (msg) =>
          (msg.textContent = "")
      );

  }


  // =========================================================
  // RESET FORM
  // =========================================================

  function resetForm() {

    form.reset();


    if (stressHiddenInput) {

      stressHiddenInput.value =
        "";

    }


    if (segGroup) {

      segGroup
        .querySelectorAll(
          ".seg-btn"
        )
        .forEach(
          (btn) =>
            btn.classList.remove(
              "active"
            )
        );

    }


    clearAllErrors();


    if (scoreNumberEl) {

      scoreNumberEl.textContent =
        "0.0";

    }


    if (scoreBandEl) {

      scoreBandEl.textContent =
        "";

    }


    if (scoreContextEl) {

      scoreContextEl.textContent =
        "";

    }


    if (gaugeFill) {

      gaugeFill.style.transition =
        "none";

      gaugeFill.style.strokeDashoffset =
        String(
          GAUGE_ARC_LENGTH
        );

      requestAnimationFrame(
        () => {

          gaugeFill.style.transition =
            "";

        }
      );

    }


    submitBtn.disabled =
      false;


    submitBtn.classList.remove(
      "loading"
    );

  }


  // =========================================================
  // COLLECT PAYLOAD
  // =========================================================

  function collectPayload() {

    const fd =
      new FormData(form);


    return {

      age:
        parseInt(
          fd.get("age"),
          10
        ),


      gender:
        fd.get("gender") || "",


      country:
        (
          fd.get("country") || ""
        ).trim(),


      academic_level:
        fd.get(
          "academic_level"
        ) || "",


      most_used_platform:
        fd.get(
          "most_used_platform"
        ) || "",


      purpose_of_use:
        fd.get(
          "purpose_of_use"
        ) || "",


      avg_daily_usage_hours:
        parseFloat(
          fd.get(
            "avg_daily_usage_hours"
          )
        ),


      daily_unlocks:
        parseInt(
          fd.get(
            "daily_unlocks"
          ),
          10
        ),


      study_hours:
        parseFloat(
          fd.get(
            "study_hours"
          )
        ),


      physical_activity_hours:
        parseFloat(
          fd.get(
            "physical_activity_hours"
          )
        ),


      sleep_hours_per_night:
        parseFloat(
          fd.get(
            "sleep_hours_per_night"
          )
        ),


      stress_level:
        fd.get(
          "stress_level"
        ) || "",

    };

  }


  // =========================================================
  // VALIDATION
  // =========================================================

  function validate(
    payload
  ) {

    const errors = [];


    const numericChecks = [

      [
        "age",
        10,
        100
      ],

      [
        "avg_daily_usage_hours",
        0,
        24
      ],

      [
        "daily_unlocks",
        0,
        Infinity
      ],

      [
        "study_hours",
        0,
        24
      ],

      [
        "physical_activity_hours",
        0,
        24
      ],

      [
        "sleep_hours_per_night",
        0,
        24
      ],

    ];


    numericChecks.forEach(
      ([key, min, max]) => {

        const input =
          document.getElementById(
            key
          );


        const value =
          payload[key];


        if (
          Number.isNaN(value)
        ) {

          errors.push([
            input,
            "This field is required."
          ]);

        }

        else if (
          value < min ||
          value > max
        ) {

          errors.push([
            input,
            `Must be between ${min} and ${
              max === Infinity
                ? "0+"
                : max
            }.`
          ]);

        }

      }
    );


    [
      "gender",
      "country",
      "academic_level",
      "most_used_platform",
      "purpose_of_use"

    ].forEach(
      (key) => {

        const input =
          document.getElementById(
            key
          );


        if (
          !payload[key] ||
          String(
            payload[key]
          ).trim() === ""
        ) {

          errors.push([
            input,
            "This field is required."
          ]);

        }

      }
    );


    if (
      !payload.stress_level
    ) {

      errors.push([
        stressHiddenInput,
        "Pick a stress level."
      ]);

    }


    return errors;

  }


  // =========================================================
  // SHOW STATE
  // =========================================================

  function showState(
    name
  ) {

    const states = [

      stateIdle,

      stateLoading,

      stateResult,

      stateError

    ];


    /*
      Hide EVERYTHING first.
    */

    states.forEach(
      (state) => {

        state.hidden =
          true;

      }
    );


    /*
      Then show ONLY requested state.
    */

    const stateMap = {

      idle:
        stateIdle,

      loading:
        stateLoading,

      result:
        stateResult,

      error:
        stateError

    };


    const selected =
      stateMap[name];


    if (selected) {

      selected.hidden =
        false;

    }

  }


  // =========================================================
  // ERROR
  // =========================================================

  function renderError(
    label,
    message
  ) {

    if (errorCopyEl) {

      errorCopyEl.textContent =
        `${label}: ${message}`;

    }


    showState(
      "error"
    );

  }


  // =========================================================
  // SCORE BAND
  // =========================================================

  function bandFor(
    score
  ) {

    if (score < 4) {

      return {

        label:
          "Signal: strained",

        context:
          "Your responses suggest elevated strain right now. Small shifts in sleep or screen time can go a long way."

      };

    }


    if (score < 7) {

      return {

        label:
          "Signal: balanced",

        context:
          "Your rhythm looks fairly steady, with some room to recover and reset."

      };

    }


    return {

      label:
        "Signal: strong",

      context:
        "Your habits point to a well-supported, resilient baseline. Keep it up."

    };

  }


  // =========================================================
  // RENDER RESULT
  // =========================================================

  function renderResult(
    score
  ) {

    const numericScore =
      Number(score);


    if (
      !Number.isFinite(
        numericScore
      )
    ) {

      renderError(
        "Unexpected response",
        "The server returned an invalid score."
      );

      return;

    }


    const clamped =
      Math.max(
        0,
        Math.min(
          10,
          numericScore
        )
      );


    const {
      label,
      context
    } =
      bandFor(
        clamped
      );


    if (scoreNumberEl) {

      scoreNumberEl.textContent =
        clamped.toFixed(2);

    }


    if (scoreBandEl) {

      scoreBandEl.textContent =
        label;

    }


    if (scoreContextEl) {

      scoreContextEl.textContent =
        context;

    }


    if (gaugeFill) {

      gaugeFill.style.transition =
        "none";


      gaugeFill.style.strokeDashoffset =
        String(
          GAUGE_ARC_LENGTH
        );


      requestAnimationFrame(
        () => {

          requestAnimationFrame(
            () => {

              gaugeFill.style.transition =
                "";

              const offset =
                GAUGE_ARC_LENGTH *
                (
                  1 -
                  clamped / 10
                );


              gaugeFill.style.strokeDashoffset =
                String(
                  offset
                );

            }
          );

        }
      );

    }


    showState(
      "result"
    );

  }


  // =========================================================
  // SUBMIT
  // =========================================================

  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      clearAllErrors();


      const payload =
        collectPayload();


      console.log(
        "Sending payload:",
        payload
      );


      const validationErrors =
        validate(
          payload
        );


      if (
        validationErrors.length
      ) {

        validationErrors.forEach(
          ([input, message]) => {

            if (input) {

              setFieldError(
                input,
                message
              );

            }

          }
        );


        showState(
          "idle"
        );


        return;

      }


      /*
        Loading state.
      */

      submitBtn.disabled =
        true;

      submitBtn.classList.add(
        "loading"
      );


      showState(
        "loading"
      );


      try {

        const response =
          await fetch(
            `${API_BASE}/predict`,
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"

              },

              body:
                JSON.stringify(
                  payload
                )

            }
          );


        console.log(
          "API status:",
          response.status
        );


        let body;


        try {

          body =
            await response.json();

        }

        catch {

          body = {};

        }


        console.log(
          "API response:",
          body
        );


        /*
          API validation error.
        */

        if (
          !response.ok
        ) {

          if (
            response.status === 422 &&
            Array.isArray(
              body.detail
            )
          ) {

            body.detail.forEach(
              (error) => {

                const field =
                  Array.isArray(
                    error.loc
                  )
                    ? error.loc[
                        error.loc.length - 1
                      ]
                    : null;


                const input =
                  field ===
                  "stress_level"

                    ? stressHiddenInput

                    : document.getElementById(
                        field
                      );


                if (input) {

                  setFieldError(
                    input,
                    error.msg
                  );

                }

              }
            );


            renderError(
              "Check your inputs",
              "The API rejected the submitted values."
            );


            return;

          }


          renderError(
            "Prediction failed",
            body.detail ||
              `HTTP ${response.status}`
          );


          return;

        }


        /*
          Check prediction.
        */

        const prediction =
          body
            .predicted_mental_health_score;


        if (
          typeof prediction !==
          "number"
        ) {

          renderError(
            "Unexpected response",
            "The server did not return a valid prediction."
          );


          return;

        }


        /*
          SUCCESS.
        */

        renderResult(
          prediction
        );

      }

      catch (error) {

        console.error(
          "FETCH ERROR:",
          error
        );


        renderError(
          "Can't reach the server",
          error.message
        );

      }

      finally {

        submitBtn.disabled =
          false;

        submitBtn.classList.remove(
          "loading"
        );

      }

    }
  );


  // =========================================================
  // RUN ANOTHER READ
  // =========================================================

  resetBtn.addEventListener(
    "click",
    () => {

      resetForm();

      showState(
        "idle"
      );

    }
  );


  // =========================================================
  // TRY AGAIN
  // =========================================================

  errorRetryBtn.addEventListener(
    "click",
    () => {

      resetForm();

      showState(
        "idle"
      );

    }
  );


  // =========================================================
  // INITIAL STATE
  // =========================================================

  resetForm();

  showState(
    "idle"
  );


})();