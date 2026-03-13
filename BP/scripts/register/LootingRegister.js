var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EntityHurtAfterEvent, world, EntityEquippableComponent, EntityHealthComponent, EquipmentSlot } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";
function level(level) {
    if (!level) {
        return 0;
    }
    else {
        return level;
    }
}
export class LootingRegister {
    looting(args) {
        const hurtEntity = args.hurtEntity;
        if (!hurtEntity) return;
        if (!args.damageSource?.damagingEntity) return;
        const entity = args.damageSource.damagingEntity;
        const equipment = entity.getComponent(EntityEquippableComponent.componentId);
        if (!equipment) return;
        const mainHand = equipment.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (!mainHand?.getItem()) return;
        const mainHandItem = mainHand.getItem();
        if (!mainHandItem?.getComponent("farmersdelight:increase_production")) return;
        const Looting = mainHandItem?.getComponent("minecraft:enchantable")?.getEnchantment("looting")?.level;
        const health = hurtEntity.getComponent(EntityHealthComponent.componentId);
        const onFire = hurtEntity.getComponent('minecraft:onfire')?.onFireTicksRemaining;
        const random = Math.floor(Math.random() * 10);
        if (!health?.currentValue && hurtEntity.typeId === 'minecraft:salmon' && random < (5 + level(Looting))) {
            if (!onFire) {
                ItemAPI.spawn(hurtEntity, 'oceanic_delight:salmon_eggs', 1);
            }
            else {
                ItemAPI.spawn(hurtEntity, 'minecraft:air', 1);
            }
        };
        if (!health?.currentValue && (hurtEntity.typeId === 'minecraft:squid')) {
            ItemAPI.spawn(hurtEntity, 'oceanic_delight:squid_tentacles', Math.floor(Math.random() * 2) + 1);
        }
        if (!health?.currentValue && (hurtEntity.typeId === 'minecraft:glow_squid')) {
            ItemAPI.spawn(hurtEntity, 'oceanic_delight:glow_squid_tentacles', Math.floor(Math.random() * 2) + 1);
        }
        if (!health?.currentValue && (hurtEntity.typeId === 'minecraft:elder_guardian')) {
            ItemAPI.spawn(hurtEntity, 'oceanic_delight:elder_guardian_eye', 1);
        }
    }
}
__decorate([
    EventAPI.register(world.afterEvents.entityHurt),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtAfterEvent]),
    __metadata("design:returntype", void 0)
], LootingRegister.prototype, "looting", null);