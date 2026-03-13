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

const BOTTOM = "oceanic_delight:sea_grape_plant_bottom";
const MIDDLE = "oceanic_delight:sea_grape_plant_middle";
const UPPER = "oceanic_delight:sea_grape_plant_upper";
const SEA_GRAPE_BLOCKS = [BOTTOM, MIDDLE, UPPER];

class SeaGrapePlantComponent {
  constructor() {
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
    this.onRandomTick = this.onRandomTick.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  onPlayerInteract(args) {
    const { block, player, dimension } = args;
    if (!player) return;
    const container = player?.getComponent("inventory")?.container;
    if (!container) return;
    const slot = player.selectedSlotIndex;
    const slotItem = container.getSlot(slot);
    if (!slotItem) return;
    const itemId = slotItem.typeId;
    const random = Math.floor(Math.random() * 101);
    if (!SEA_GRAPE_BLOCKS.includes(block.typeId)) return;
    let bottomY = block.location.y, foundBottom = false;
    for (let y = block.location.y; y >= block.location.y - 10; y--) {
      const loc = { x: block.location.x, y, z: block.location.z };
      const id = dimension.getBlock(loc)?.typeId;
      if (id === BOTTOM) { bottomY = y; foundBottom = true; break; }
      if (![MIDDLE, UPPER].includes(id)) break;
    }
    if (!foundBottom) return;
    let hasFruit = false, topY = block.location.y;
    for (let y = bottomY; y <= bottomY + 50; y++) {
      const loc = { x: block.location.x, y, z: block.location.z };
      const id = dimension.getBlock(loc)?.typeId;
      if (id && SEA_GRAPE_BLOCKS.includes(id)) {
        topY = y;
      } else {
        const aboveLoc = { x: block.location.x, y: topY + 1, z: block.location.z };
        const aboveId = dimension.getBlock(aboveLoc)?.typeId;
        if (aboveId && aboveId.includes("sea_grape_fruit")) hasFruit = true;
        break;
      }
    }
    if (hasFruit && itemId == "minecraft:bone_meal") {
      player.playSound("item.bone_meal.use", block.location);
      block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
      return;
    }
    if (hasFruit && itemId == "oceanic_delight:sea_grape") return;
    let height = 0;
    for (let y = bottomY; y <= bottomY + 50; y++) {
      const loc = { x: block.location.x, y, z: block.location.z };
      const id = dimension.getBlock(loc)?.typeId;
      if (id && SEA_GRAPE_BLOCKS.includes(id)) height++;
      else break;
    }
    const growY = bottomY + height;
    const aboveLoc = { x: block.location.x, y: growY + 1, z: block.location.z };
    const aboveBlock = dimension.getBlock(aboveLoc);
    if (!aboveBlock || aboveBlock.typeId !== "minecraft:water" || aboveBlock?.permutation?.getState('liquid_depth') !== 0) {
      if (itemId == "minecraft:bone_meal") {
        player.playSound("item.bone_meal.use", block.location);
        block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
        if (player?.getGameMode() != GameMode.Creative) ItemUtil.clearItem(container, slot, 1);
      }
      return;
    }
    const blockType = height === 1 ? MIDDLE : UPPER;
    if (itemId == "minecraft:bone_meal") {
      player.playSound("item.bone_meal.use", block.location);
      if (player?.getGameMode() == GameMode.Creative || random <= 60) {
        dimension.setBlockType({ x: block.location.x, y: growY, z: block.location.z }, blockType);
      }
      block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
      if (player?.getGameMode() != GameMode.Creative) ItemUtil.clearItem(container, slot, 1);
    } else if (itemId == "oceanic_delight:sea_grape") {
      player.playSound("dig.grass", block.location);
      dimension.setBlockType({ x: block.location.x, y: growY, z: block.location.z }, blockType);
      if (player?.getGameMode() != GameMode.Creative) ItemUtil.clearItem(container, slot, 1);
    }
  }

  onRandomTick(args) {
    const { block, dimension } = args;
    const loc = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
    const topBlock = dimension.getBlock(loc);
    if (!topBlock || topBlock.typeId !== "minecraft:water" || topBlock.permutation.getState('liquid_depth') !== 0) return;
    if (block.typeId == BOTTOM) {
      dimension.setBlockType(loc, MIDDLE);
    } else if (block.typeId == MIDDLE) {
      dimension.setBlockType(loc, UPPER);
    } else if (block.typeId == UPPER) {
      dimension.setBlockType({ x: block.location.x, y: block.location.y + 1, z: block.location.z }, "oceanic_delight:sea_grape_fruit");
    }
  }

  onTick(args) {
    const { block, dimension } = args;
    if (!SEA_GRAPE_BLOCKS.includes(block.typeId)) return;
    const stage = Number(block.permutation.getState("oceanic_delight:connection_stage"));
    const topBlock = dimension.getBlock({ x: block.location.x, y: block.location.y + 1, z: block.location.z });
    let setStage1 = false;
    if (block.typeId === BOTTOM && topBlock?.typeId === MIDDLE) setStage1 = true;
    else if (block.typeId === MIDDLE && topBlock?.typeId === UPPER) setStage1 = true;
    else if (block.typeId === UPPER && (topBlock?.typeId === UPPER || topBlock?.typeId === "oceanic_delight:sea_grape_fruit")) setStage1 = true;
    if ((setStage1 && stage !== 1) || (!setStage1 && stage === 1)) {
      const newPerm = block.permutation.withState("oceanic_delight:connection_stage", setStage1 ? 1 : 0);
      dimension.setBlockPermutation(block.location, newPerm);
    }
  }
}

export class SeaGrapePlantRegister {
  register(args) {
    args.blockComponentRegistry.registerCustomComponent('oceanic_delight:sea_grape_plant', new SeaGrapePlantComponent());
  }
}

__decorate([
  methodEventSub(system.beforeEvents.startup),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [StartupEvent]),
  __metadata("design:returntype", void 0)
], SeaGrapePlantRegister.prototype, "register", null);