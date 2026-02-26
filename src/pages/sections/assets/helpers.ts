import { AssetMuebleSchema, AssetVehicularSchema, type AssetMuebleType, type AssetVehicularType } from "../../../models/assets.js";

function isAssetMuebleType(asset: unknown): asset is AssetMuebleType {
    return AssetMuebleSchema.safeParse(asset).success;
}

function isAssetVehicularType(asset: unknown): asset is AssetVehicularType {
    return AssetVehicularSchema.safeParse(asset).success;
}

export { isAssetMuebleType, isAssetVehicularType };

