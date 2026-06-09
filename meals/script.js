window.addEventListener("DOMContentLoaded", () => {

    const selectedDate =
        document.getElementById("selectedDate");

    const mealTitle =
        document.getElementById("mealTitle");

    const mealResult =
        document.getElementById("mealResult");

    const apiBase =
        "https://open.neis.go.kr/hub/mealServiceDietInfo" +
        "?KEY=3b032261176042658cad62c6d0e8355c" +
        "&Type=json" +
        "&ATPT_OFCDC_SC_CODE=B10" +
        "&SD_SCHUL_CODE=7010563";

    selectedDate.addEventListener(
        "change",
        async () => {

            const value =
                selectedDate.value;

            if (!value) return;

            const date =
                new Date(value);

            const y =
                date.getFullYear();

            const m =
                String(
                    date.getMonth() + 1
                ).padStart(2, "0");

            const d =
                String(
                    date.getDate()
                ).padStart(2, "0");

            const dayNames =
                ["일","월","화","수","목","금","토"];

            const day =
                dayNames[
                    date.getDay()
                ];

            const ymd =
                `${y}${m}${d}`;

            mealTitle.textContent =
                "급식 불러오는 중...";

            mealResult.innerHTML = "";

            try{

                const response =
                    await fetch(
                        `${apiBase}&MLSV_YMD=${ymd}`
                    );

                const data =
                    await response.json();

                const meal =
                    data?.mealServiceDietInfo?.[1]
                        ?.row?.[0]?.DDISH_NM;

                if(!meal){
                    throw new Error();
                }

                let text = meal;

                text = text.replace(
                    /<br\/?>/gi,
                    "\n"
                );

                text = text.replace(
                    /2\./g,
                    "🥛 "
                );

                text = text.replace(
                    /\d+\./g,
                    ""
                );

                text = text.replace(
                    /\([^)]+\)/g,
                    ""
                );

                text = text.trim();

                mealTitle.textContent =
                    `오늘의 급식 (${day})`;

                mealResult.innerHTML =
                    text.replace(
                        /\n/g,
                        "<br>"
                    );

            }

            catch(error){

                mealTitle.textContent =
                    `급식 정보 없음 (${day})`;

                mealResult.innerHTML =
                    "선택한 날짜의 급식 정보가 없습니다.";

            }

        }
    );

});
