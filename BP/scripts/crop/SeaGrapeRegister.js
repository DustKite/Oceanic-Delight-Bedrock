var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PlayerInteractWithBlockBeforeEvent, world } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";
export class SeaGrapeRegister {
  tryUseItem(args) {
    const itemStack = args.itemStack;
    const block = args.block;

    if (!itemStack || !(itemStack.typeId == 'minecraft:bucket' &&
      (block.typeId == "oceanic_delight:sea_grape_plant_bottom" ||
        block.typeId == "oceanic_delight:sea_grape_plant_middle" ||
        block.typeId == "oceanic_delight:sea_grape_plant_upper" ||
        block.typeId == "oceanic_delight:sea_grape_fruit"))) {
      return;
    }
    args.cancel = true;
  }
}
__decorate([
  methodEventSub(world.beforeEvents.playerInteractWithBlock),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [PlayerInteractWithBlockBeforeEvent]),
  __metadata("design:returntype", void 0)
], SeaGrapeRegister.prototype, "tryUseItem", null);