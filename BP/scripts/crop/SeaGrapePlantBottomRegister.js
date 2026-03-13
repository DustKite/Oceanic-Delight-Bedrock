var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { StartupEvent, system, GameMode } from "@minecraft/server";
import { ItemUtil } from "../lib/ItemUtil";
import { methodEventSub } from "../lib/eventHelper";
class SeaGrapePlantBottomComponent {
  constructor() {
    this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
  }
  beforeOnPlayerPlace(args) {
    const player = args.player;
    const inventory = player?.getComponent("inventory");
    const container = inventory?.container;
    const block = args.block;
    const dimension = args.dimension;
    if (!block) return;
    if (!(block.typeId === 'minecraft:water' && block.permutation.getState('liquid_depth') === 0)) {
      args.cancel = true;
    } else {
      if (!player || !container) return;
      system.runTimeout(() => {
        dimension.setBlockType(block.location, "oceanic_delight:sea_grape_plant_bottom");
        dimension.playSound("dig.grass", block.location);
        if (player?.getGameMode() != GameMode.Creative) {
          ItemUtil.clearItem(container, player.selectedSlotIndex, 1);
        }
      });
    }
  }
}
export class SeaGrapePlantBottomRegister {
  register(args) {
    args.blockComponentRegistry.registerCustomComponent('oceanic_delight:sea_grape_plant_bottom', new SeaGrapePlantBottomComponent());
  }
}
__decorate([
  methodEventSub(system.beforeEvents.startup),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [StartupEvent]),
  __metadata("design:returntype", void 0)
], SeaGrapePlantBottomRegister.prototype, "register", null);