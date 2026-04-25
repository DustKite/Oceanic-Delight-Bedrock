const CookingPotRecipes = [
    {
        "identifer": "oceanic_delight:fish_egg_noodle_soup",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "tag": "farmersdelight:is_pasta" },
            { "tag": "farmersdelight:is_onion" },
            { "item": "minecraft:bamboo" },
            { "item": "oceanic_delight:salmon_eggs" }
        ],
        "result": {
            "item": "oceanic_delight:fish_egg_noodle_soup"
        }
    },
    {
        "identifer": "oceanic_delight:fried_shrimp",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 100,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:wheat" },
            { "tag": "minecraft:egg" },
            { "tag": "farmersdelight:raw_shrimp" }
        ],
        "result": {
            "item": "oceanic_delight:fried_shrimp"
        }
    },
    {
        "identifer": "oceanic_delight:globular_rice",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "oceanic_delight:elder_guardian_eye" },
            { "tag": "farmersdelight:is_cabbage" },
            { "item": "minecraft:sugar" },
            { "tag": "farmersdelight:is_rice" }
        ],
        "result": {
            "item": "oceanic_delight:globular_rice"
        }
    },
    {
        "identifer": "oceanic_delight:glow_squid_stew",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            [
                { "item": "oceanic_delight:glow_squid_tentacles" },
                { "item": "crabbersdelight:raw_glow_squid_tentacles" }
            ],
            { "item": "farmersdelight:tomato_sauce" },
            { "tag": "farmersdelight:is_onion" },
            { "item": "minecraft:brown_mushroom" }
        ],
        "result": {
            "item": "oceanic_delight:glow_squid_stew"
        }
    },
    {
        "identifer": "oceanic_delight:nautilus_juice",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:nautilus_shell"
        },
        "priority": 0,
        "time": 200,
        "experience": 3.0,
        "ingredients": [
            { "item": "minecraft:kelp" },
            { "item": "minecraft:apple" },
            { "item": "minecraft:sweet_berries" }
        ],
        "result": {
            "item": "oceanic_delight:nautilus_juice"
        }
    },
    {
        "identifer": "oceanic_delight:paella_plate",
        "tags": ["cooking_pot"],
        "container": {
            "item": "farmersdelight:skillet_block"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "tag": "farmersdelight:is_rice" },
            { "tag": "farmersdelight:is_rice" },
            { "tag": "farmersdelight:raw_shrimp" },
            { "tag": "farmersdelight:is_tomato" },
            [
                { "item": "minecraft:chicken" },
                { "tag": "farmersdelight:is_raw_chicken" }
            ]
        ],
        "result": {
            "item": "oceanic_delight:paella_plate"
        }
    },
    {
        "identifer": "oceanic_delight:shrimp_chips",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 100,
        "experience": 1.0,
        "ingredients": [
            { "tag": "farmersdelight:raw_shrimp" },
            { "tag": "farmersdelight:raw_shrimp" },
            { "tag": "farmersdelight:is_dough" },
            { "item": "minecraft:sunflower" }
        ],
        "result": {
            "item": "oceanic_delight:shrimp_chips",
            "count": 4
        }
    },
    {
        "identifer": "oceanic_delight:pasta_with_eye_balls",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "oceanic_delight:elder_guardian_eye" },
            { "tag": "farmersdelight:is_pasta" },
            { "item": "minecraft:dried_kelp" },
            { "item": "farmersdelight:tomato_sauce" }
        ],
        "result": {
            "item": "oceanic_delight:pasta_with_eyeball"
        }
    },
    {
        "identifer": "oceanic_delight:shrimp_rice",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "tag": "farmersdelight:is_rice" },
            { "tag": "farmersdelight:raw_shrimp" },
            { "tag": "farmersdelight:is_tomato" },
            { "tag": "farmersdelight:raw_calamari" },
            { "tag": "minecraft:egg" }
        ],
        "result": {
            "item": "oceanic_delight:shrimp_rice"
        }
    },
    {
        "identifer": "oceanic_delight:shrimp_stew",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "tag": "farmersdelight:raw_shrimp" },
            [
                { "item": "minecraft:cod" },
                { "item": "minecraft:tropical_fish" },
                { "item": "minecraft:salmon" },
                { "tag": "farmersdelight:is_raw_fish" }
            ],
            { "item": "farmersdelight:tomato_sauce" },
            { "item": "minecraft:potato" },
            { "tag": "farmersdelight:is_onion" }
        ],
        "result": {
            "item": "oceanic_delight:shrimp_stew"
        }
    },
    {
        "identifer": "oceanic_delight:steamed_beef",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            [
                { "item": "minecraft:beef" },
                { "tag": "farmersdelight:is_raw_beef" }
            ],
            { "item": "minecraft:potato" },
            { "tag": "farmersdelight:is_onion" },
            { "item": "minecraft:kelp" }
        ],
        "result": {
            "item": "oceanic_delight:steamed_beef",
            "count": 2
        }
    },
    {
        "identifer": "oceanic_delight:stuffed_pufferfish",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:pufferfish"
        },
        "priority": 0,
        "time": 400,
        "experience": 2.0,
        "ingredients": [
            { "tag": "farmersdelight:is_rice" },
            { "tag": "farmersdelight:is_cabbage" },
            { "item": "minecraft:dried_kelp" },
            [
                { "item": "farmersdelight:cod_slice" },
                { "item": "minecraft:cod" }
            ],
            [
                { "item": "oceanic_delight:sea_pickle_slices" },
                { "item": "minecraft:sea_pickle" }
            ]
        ],
        "result": {
            "item": "oceanic_delight:stuffed_pufferfish"
        }
    },
    {
        "identifer": "oceanic_delight:takoyaki",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "tag": "farmersdelight:raw_calamari" },
            { "tag": "farmersdelight:is_dough" },
            { "tag": "minecraft:egg" },
            { "item": "minecraft:kelp" }
        ],
        "result": {
            "item": "oceanic_delight:takoyaki",
            "count": 2
        }
    }
];

export { CookingPotRecipes };