function viewPokemon(id, name, type) {
  // INFO: VARIABLE SETUP
  let long_id = id.toString().padStart(4, "0");
  let name_fix = name.replace(/\W/, "").replace(" ", "-").toLowerCase();
  let group_count = { t: 0, x4: 0, x2: 0, x0: 0, x05: 0, x025: 0 };
  let relevant_types = [];
  let relevant_factors = [];

  // INFO: HTML SETUP AND TITLE CREATION
  $("main").append(`<div id="p${long_id}" class="pokemon"></div>`);
  $(`#p${long_id}`).append(
    `<h1 style='background-image: url("https://img.pokemondb.net/sprites/black-white/anim/normal/${name_fix}.gif")'>${name} <sup>${id}</sup></h1>`
  );

  let bg_img = new Image();
  bg_img.src = `img/anim/${long_id}.gif`;
  bg_img.onload = function () {
    let h = $(`#p${long_id} h1`).outerHeight();
    let w = (h / this.height) * this.width + 16;
    $(`#p${long_id} h1`).css("padding-left", `${w}px`);
  };

  $(`#p${long_id}`).append(`<h2 class="type t">Tp.</h2>`);
  $(`#p${long_id}`).append(`<h2 class="x4 empty">x4</h2>`);
  $(`#p${long_id}`).append(`<h2 class="x2 empty">x2</h2>`);
  $(`#p${long_id}`).append(`<h2 class="x0 empty">x0</h2>`);
  $(`#p${long_id}`).append(`<h2 class="x05 empty">x½</h2>`);
  $(`#p${long_id}`).append(`<h2 class="x025 empty">x¼</h2>`);

  // INFO: TYPE LABELS
  type.forEach((t) => {
    $(`#p${long_id} h2.type`).after(
      `<img class="t typelabels" src="img/type-v/${t.toLowerCase()}.png"/>`
    );
    group_count["t"]++;
  });

  // INFO: TYPE FACTORS
  if (type.length == 2) {
    Object.keys(order).forEach((t) => {
      let factor =
        doubles[
          order[type[0].toLowerCase()] + order[type[1].toLowerCase()] + order[t]
        ];
      if (factor != 1) {
        relevant_types.push(t);
        relevant_factors.push(factor);
      }
    });
  } else {
    Object.keys(index).forEach((t) => {
      let factor = types[index[t]][index[type[0].toLowerCase()]];
      if (factor != 1) {
        relevant_types.push(t);
        relevant_factors.push(factor);
      }
    });
  }

  console.log(`Types for ${name}: `, relevant_types);
  console.log(`Factors for ${name}: `, relevant_factors);

  // INFO: TYPE FACTOR LABELS
  for (var i = 0; i < relevant_types.length; i++) {
    let t = relevant_types[i];
    let f = String(relevant_factors[i]).replace(".", "");

    $(`#p${long_id} h2.x${f}`).removeClass("empty");
    $(`#p${long_id} h2.x${f}`).after(
      `<img class="x${f} typelabels" src="img/type-v/${t}.png"/>`
    );
    group_count[`x${f}`]++;
  }

  // INFO: CALCULATE TOTAL LABELS
  let groups_total = Object.values(group_count).reduce((a, b) => a + b);
  console.log(`Groups for ${name}: `, group_count);
  console.log(`Labels for ${name}: `, groups_total);

  // INFO: CSS SETUP
  $(`#p${long_id}`).css(
    "grid-template-columns",
    `repeat(${groups_total}, 1fr)`
  );
  $(`#p${long_id} h1`).css("grid-column", `1 / span ${groups_total}`);

  let title_counter = 1;
  Object.keys(group_count).forEach((g) => {
    if (group_count[g] > 0) {
      $(`#p${long_id} h2.${g}`).css(
        "grid-column",
        `${title_counter} / span ${group_count[g]}`
      );
      title_counter += group_count[g];
    }
  });
}
