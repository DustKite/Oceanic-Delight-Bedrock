import { system, GameMode } from "@minecraft/server";
import { ItemUtil } from "../lib/ItemUtil";
import { ItemAPI } from "../lib/ItemAPI";

export class BlockFood {
  constructor() {
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  onPlayerInteract(args) {
    const { block, player, dimension } = args;
    const stage = Number(block.permutation.getState("farmersdelight:food_block_stage"));
    const blockType = block.typeId;
    const hunger = player.getComponent('minecraft:player.hunger');
    const saturation = player.getComponent('minecraft:player.saturation');
    const inventory = player?.getComponent("inventory");

    if (!hunger || !saturation || !inventory) return;
    const selectedSlotIndex = player.selectedSlotIndex;
    const container = inventory.container;
    const itemStack = container.getItem(selectedSlotIndex);
    switch (blockType) {
      case "oceanic_delight:sponge_cake":
        this.handleSpongeCake(block, player, dimension, stage, itemStack, container, selectedSlotIndex, hunger, saturation);
        break;
      case "oceanic_delight:stuffed_pufferfish":
        this.handleBowlFood(block, player, dimension, stage, itemStack, container, selectedSlotIndex,
          "oceanic_delight:plate_of_stuffed_pufferfish", "use.cloth", 3);
        break;
      case "oceanic_delight:paella_plate":
        this.handlePaellaPlate(block, player, dimension, stage, itemStack, container, selectedSlotIndex);
        break;
    }
  }

  handleSpongeCake(block, player, dimension, stage, itemStack, container, selectedSlotIndex, hunger, saturation) {
    const hasKnife = itemStack && itemStack.hasTag("farmersdelight:is_knife");
    if (hasKnife) {
      ItemAPI.spawn(block, "oceanic_delight:sponge_cake_slice", 1);
      player.playSound("use.cloth");
      this.updateBlockState(block, dimension, stage, 3)
      if (player?.getGameMode() != GameMode.Creative) {
        ItemUtil.damageItem(container, selectedSlotIndex);
      }
      return;
    }
    player.playSound("random.eat");
    player.addEffect('water_breathing', 600, { amplifier: 0 });
    hunger.setCurrentValue(Math.min(hunger.currentValue + 3, hunger.effectiveMax));
    saturation.setCurrentValue(Math.min(saturation.currentValue + 0.6, saturation.effectiveMax));
    this.updateBlockState(block, dimension, stage, 3);
  }

  handleBowlFood(block, player, dimension, stage, itemStack, container, selectedSlotIndex, spawnItemId, sound, maxStage) {
    if (!itemStack || itemStack.typeId !== "minecraft:bowl") {
      player.onScreenDisplay.setActionBar({
        translate: "farmersdelight.blockfood.minecraft:bowl"
      });
      return;
    }
    ItemAPI.spawn(block, spawnItemId, 1);
    player.playSound(sound);
    this.updateBlockState(block, dimension, stage, maxStage);
    if (player?.getGameMode() != GameMode.Creative) {
      ItemUtil.clearItem(container, selectedSlotIndex);
    }
  }

  handlePaellaPlate(block, player, dimension, stage, itemStack, container, selectedSlotIndex) {
    if (stage === 4) {
      player.playSound("block.lantern.hit");
      dimension.setBlockType(block.location, "minecraft:air");
      ItemAPI.spawn(block, "farmersdelight:skillet_block", 1);
      return;
    }
    if (!itemStack || itemStack.typeId !== "minecraft:bowl") {
      player.onScreenDisplay.setActionBar({
        translate: "farmersdelight.blockfood.minecraft:bowl"
      });
      return;
    }
    ItemAPI.spawn(block, "oceanic_delight:plate_of_paella", 1);
    player.playSound("block.lantern.hit");
    this.updateBlockState(block, dimension, stage, 4);

    if (player?.getGameMode() != GameMode.Creative) {
      ItemUtil.clearItem(container, selectedSlotIndex);
    }
  }

  updateBlockState(block, dimension, stage, maxStage) {
    if (stage < maxStage) {
      block.setPermutation(
        block.permutation.withState('farmersdelight:food_block_stage', stage + 1)
      );
    } else {
      dimension.setBlockType(block.location, "minecraft:air");
    }
  }

  static init() {
    system.beforeEvents.startup.subscribe((event) => {
      const instance = new BlockFood();
      event.blockComponentRegistry.registerCustomComponent('oceanic_delight:blockfood', {
        onPlayerInteract: instance.onPlayerInteract.bind(instance)
      });
    });
  }
}

BlockFood.init();