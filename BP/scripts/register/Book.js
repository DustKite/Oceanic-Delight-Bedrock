var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ActionFormData } from '@minecraft/server-ui';
import { ItemUseAfterEvent, world } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";

const BACK_BUTTON_ICON = "textures/ui/recap_glyph_color_2x";

function FishingNetForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.oceanic_delight:fishing_net" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.fishing_net" }
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      mainForm(player);
    }
  });
}

function CropForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "oceanic_delight.book.crop" }] })
    .button({ "rawtext": [{ "text": "item.oceanic_delight:wild_sea_grape" }] }, "textures/blocks/wild_sea_grape")
    .button({ "rawtext": [{ "text": "item.oceanic_delight:sea_grape" }] }, "textures/items/sea_grape")
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    switch (response.selection) {
      case 0:
        WildSeaGrapeForm(player);
        break;
      case 1:
        CropSeaGrapeForm(player);
        break;
      case 2:
        mainForm(player);
        break;
    }
  });
}

function WildSeaGrapeForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.oceanic_delight:wild_sea_grape" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.book.wild_sea_grape" }
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      CropForm(player);
    }
  });
}

function CropSeaGrapeForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.oceanic_delight:sea_grape" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.book.sea_grape" }
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      CropForm(player);
    }
  });
}

function IngredientsForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "oceanic_delight.book.ingredients" }] })
    .button({ "rawtext": [{ "text": "item.oceanic_delight:squid_tentacles" }] }, "textures/items/squid_tentacles")
    .button({ "rawtext": [{ "text": "item.oceanic_delight:shrimp" }] }, "textures/items/shrimp")
    .button({ "rawtext": [{ "text": "item.oceanic_delight:salmon_eggs" }] }, "textures/items/salmon_eggs")
    .button({ "rawtext": [{ "text": "item.oceanic_delight:elder_guardian_eye" }] }, "textures/items/elder_guardian_eye")
    .button({ "rawtext": [{ "text": "item.oceanic_delight:sea_pickle_slices" }] }, "textures/items/sea_pickle_slices")
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    switch (response.selection) {
      case 0:
        SquidTentaclesForm(player);
        break;
      case 1:
        ShrimpForm(player);
        break;
      case 2:
        SalmonEggsForm(player);
        break;
      case 3:
        ElderGuardianEyeForm(player);
        break;
      case 4:
        SeaPickleSlicesForm(player);
        break;
      case 5:
        mainForm(player);
        break;
    }
  });
}

function SquidTentaclesForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.oceanic_delight:squid_tentacles" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.book.squid_tentacles" },
        { "text": "\n" },
        { "translate": "oceanic_delight.book.squid_tentacles.description" },
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function ShrimpForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.oceanic_delight:shrimp" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.book.shrimp.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function SalmonEggsForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.oceanic_delight:salmon_eggs" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.book.salmon_eggs.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function ElderGuardianEyeForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.oceanic_delight:elder_guardian_eye" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.book.elder_guardian_eye.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function SeaPickleSlicesForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.oceanic_delight:sea_pickle_slices" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.book.sea_pickle_slices.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function thanksForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "oceanic_delight.book.thanks" }] })
    .body({
      "rawtext": [
        { "translate": "oceanic_delight.book.thanks.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "oceanic_delight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      mainForm(player);
    }
  });
}

function mainForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "oceanic_delight.book.pack" }] })
    .button({ "rawtext": [{ "text": "item.oceanic_delight:fishing_net" }] }, "textures/items/fishing_net")
    .button({ "rawtext": [{ "text": "oceanic_delight.book.crop" }] }, "textures/items/wild_sea_grape")
    .button({ "rawtext": [{ "text": "oceanic_delight.book.ingredients" }] }, "textures/items/squid_tentacles")
    .button({ "rawtext": [{ "text": "oceanic_delight.book.thanks" }] }, "textures/items/nether_star");

  form.show(player).then((response) => {
    switch (response.selection) {
      case 0:
        FishingNetForm(player);
        break;
      case 1:
        CropForm(player);
        break;
      case 2:
        IngredientsForm(player);
        break;
      case 3:
        thanksForm(player);
        break;
    }
  });
}

export class Book {
  itemUse(args) {
    const player = args.source;
    const itemStack = args.itemStack;
    if (itemStack?.typeId === "oceanic_delight:book_oceanic_delight") {
      mainForm(player);
    }
  }
}

__decorate([
  methodEventSub(world.afterEvents.itemUse),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [ItemUseAfterEvent]),
  __metadata("design:returntype", void 0)
], Book.prototype, "itemUse", null);