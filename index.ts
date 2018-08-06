import { NatureRemoApiClient } from "nature-remo-api-client";

process.env.TZ = "Asia/Tokyo";

const LIVING_ROOM = "リビング";
const BED_ROOM = "寝室";

if (process.env.TOKEN !== undefined) {
  const client = new NatureRemoApiClient(process.env.TOKEN);
  (async function() {
    const devices = await client.devices();
    const appliances = await client.appliances();
    const livingDevice = devices.result.filter(
      device => device.name === LIVING_ROOM
    )[0];
    const temperature = livingDevice.newest_events.te.value;
    console.log(
      appliances.result.filter(
        appliance => appliance.device.id === livingDevice.id
      )
    );
    if (temperature >= 26) {
      //エアコンを付けたいね
    }
  })();
}
