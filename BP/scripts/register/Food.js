var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";

export class Food {
    eat(args) {
        const itemStack = args.itemStack;
        const player = args.source;
        const useDuration = args.useDuration;
        if (useDuration)
            return;
        const weight = Math.floor(Math.random() * 11);

        switch (itemStack.typeId) {
            case "oceanic_delight:ancient_fish_eggs":
                player.addEffect('conduit_power', 900, { amplifier: 0 });
                break;
            case "oceanic_delight:shrimp":
                if (weight <= 8) {
                    player.addEffect('nausea', 300, { amplifier: 0 });
                }
                break;
            case "oceanic_delight:sponge_cake_slice":
                player.addEffect('water_breathing', 600, { amplifier: 0 });
                break;
            case "oceanic_delight:nautilus_juice":
                player.addEffect('resistance', 1200, { amplifier: 0 });
                break;
            case "oceanic_delight:sea_grape_juice":
                player.addEffect('water_breathing', 1200, { amplifier: 0 });
                break;
            case "oceanic_delight:sea_grape":
                player.addEffect('water_breathing', 300, { amplifier: 0 });
                break;
            case "oceanic_delight:plate_of_stuffed_pufferfish":
                if (weight <= 2) {
                    player.addEffect('nausea', 200, { amplifier: 0 });
                }
                player.addEffect('saturation', 300, { amplifier: 0 });
                break;
            case "oceanic_delight:squid_salad":
                player.addEffect('water_breathing', 300, { amplifier: 0 });
                break;
            case "oceanic_delight:fish_egg_noodle_soup":
                player.addEffect('saturation', 300, { amplifier: 0 });
                break;
            case "oceanic_delight:globular_rice":
                player.addEffect('saturation', 300, { amplifier: 0 });
                break;
            case "oceanic_delight:glow_squid_stew":
                player.addEffect('saturation', 180, { amplifier: 0 });
                break;
            case "oceanic_delight:pasta_with_eye_balls":
                player.addEffect('saturation', 300, { amplifier: 0 });
                break;
            case "oceanic_delight:plate_of_paella":
                player.addEffect('saturation', 300, { amplifier: 0 });
                break;
            case "oceanic_delight:shrimp_rice":
                player.addEffect('saturation', 180, { amplifier: 0 });
                break;
            case "oceanic_delight:squid_and_pickles":
                player.addEffect('saturation', 180, { amplifier: 0 });
                break;
            case "oceanic_delight:shrimp_stew":
                player.addEffect('saturation', 300, { amplifier: 0 });
                break;
        }
    }
}
__decorate([
    methodEventSub(world.afterEvents.itemStopUse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Food.prototype, "eat", null);