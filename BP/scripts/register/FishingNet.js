var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, PlayerBreakBlockAfterEvent, GameMode } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";
import { ItemUtil } from "../lib/ItemUtil";
const spawnLoot = (path, dimension, location) => dimension.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${path}"`);
const spawnEntity = (entityType, dimension, location) => dimension.spawnEntity(entityType, location);
const damageItem = (player) => {
  if (player?.getGameMode() == GameMode.Creative) return;
  const inventory = player?.getComponent("inventory");
  const container = inventory?.container;
  if (container) ItemUtil.damageItem(container, player.selectedSlotIndex);
};
const isValidBlock = (blockId) => ["minecraft:seagrass", "minecraft:kelp"].includes(blockId);
export class FishingNet {
  itemUse(args) {
    const { source: player, itemStack } = args;
    if (itemStack?.typeId !== "oceanic_delight:fishing_net") return;
    const currentCooldown = player.getItemCooldown("oceanic_delight:fishing_net_cooldown");
    if (currentCooldown > 0) return;
    const headLocation = player.getHeadLocation();
    const viewDirection = player.getViewDirection();
    const blockHit = player.dimension.getBlockFromRay(headLocation, viewDirection, { maxDistance: 5, includePassableBlocks: true });
    if (!blockHit?.block) return player.startItemCooldown("oceanic_delight:fishing_net_cooldown", 10);
    if (!isValidBlock(blockHit.block.typeId)) return player.startItemCooldown("oceanic_delight:fishing_net_cooldown", 10);
    const isSeagrass = blockHit.block.typeId === "minecraft:seagrass";
    if (isSeagrass) {
      const seaGrassType = blockHit.block.permutation.getState("sea_grass_type");
      const isDoubleSeagrass = seaGrassType === "double_top" || seaGrassType === "double_bot";
      if (!isDoubleSeagrass) return player.startItemCooldown("oceanic_delight:fishing_net_cooldown", 10);
    }
    const lootPath = isSeagrass ? 'oceanic_delight/fishing_net/seagrass' : 'oceanic_delight/fishing_net/kelp';
    spawnLoot(lootPath, player.dimension, blockHit.block.location);
    player.startItemCooldown("oceanic_delight:fishing_net_cooldown", 60);
    player.playSound("armor.equip_leather");
    const destroyProb = isSeagrass ? 0.05 : 0.2;
    if (Math.random() <= destroyProb) try { blockHit.block.setType("minecraft:air"); } catch (error) { }
    if (!isSeagrass && Math.random() <= 0.2) try { spawnEntity("minecraft:pufferfish", player.dimension, blockHit.block.location); } catch (error) { }
    damageItem(player);
  }
  break(args) {
    const { player, itemStackAfterBreak } = args;
    if (!itemStackAfterBreak || itemStackAfterBreak.typeId !== "oceanic_delight:fishing_net") return;
    damageItem(player);
  }
}
__decorate([
  methodEventSub(world.afterEvents.itemUse),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object]),
  __metadata("design:returntype", void 0)
], FishingNet.prototype, "itemUse", null);
__decorate([
  methodEventSub(world.afterEvents.playerBreakBlock),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [PlayerBreakBlockAfterEvent]),
  __metadata("design:returntype", void 0)
], FishingNet.prototype, "break", null);