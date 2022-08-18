import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import MainFeature1 from "components/features/ServerCard.js";
import axios from "axios";

/**
 * Url, auf der der Checker-Server läuft.
 * @type {string}
 */
const statusCheckerUrl = "https://arkisland.starleague.me/";
/**
 * Array mit Infos zu den Servern im Format [Servername,Port]
 * @type {(string|number)[][]}
 */
const serverList = [['The Island',27015],["Scortched Earth",27016],["The Center - Legacy",27018],["The Island - Hidden Lake - Legacy",27017]]
/**
 * Url auf dem die Server laufen
 * @type {string}
 */
const serverUrl = 'starleague.me';

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
    const [post, setPost] = React.useState(null);

    let fullUrl = statusCheckerUrl;
    fullUrl += "?serverUrl="+serverUrl;
    for (let t = 0; t < serverList.length; t++) {
        fullUrl += "&server"+t+"=";
        fullUrl += serverList[t][1];
    }
    console.log(fullUrl);

    React.useEffect(() => {
        axios.get(fullUrl).then((response) => {
            console.log(response.data)
            setPost(response.data);
        });
    }, []);

    axios.put("starleage.me", {
        table: "Lager",
        columnname: "lagerID",
        columnid: "1"
    }).then (res => console.log(res));

  return (
    <AnimationRevealPage>
        {/*Server as a foreach*/}
        {serverList.map((server, forEachIndex) => {

            if(!post)
                 return (<MainFeature1
                    subheading={<Subheading>{server[0]}</Subheading>}
                    heading="Waiting on response from Status-Checker...If this doesn't go away within 10 seconds, pls message Ian urgently!"
                    description=""
                    buttonRounded={false}
                    primaryButtonText="Message Ian"
                    primaryButtonUrl="https://discordapp.com/users/178233738109517824/"
                    imageSrc="https://thumbs.dreamstime.com/b/waiting-icon-trendy-design-style-waiting-icon-isolated-white-background-waiting-vector-icon-simple-modern-flat-symbol-135740731.jpg"
                />);
                else
                if (post[forEachIndex].serverName == null)
                     return (<MainFeature1
                        subheading={<Subheading>{server[0]}</Subheading>}
                        heading={"Ark Server is offline"}
                        description={post[forEachIndex]}
                        description2={"Please Message Ian about this!"}
                        buttonRounded={false}
                        primaryButtonText="Message Ian"
                        primaryButtonUrl="https://discordapp.com/users/178233738109517824/"
                        imageSrc="https://www.ub.tum.de/files/icon_offline.png"
                    />);
                    else {
                        var buttonUrl = "";
                        switch (post[forEachIndex].map) {
                            case 'TheIsland':
                                buttonUrl = "https://ark.gamepedia.com/media/ark.gamepedia.com/thumb/0/04/The_Island_Topographic_Map.jpg/600px-The_Island_Topographic_Map.jpg";
                                break;
                            default:
                                buttonUrl = "https://image.api.playstation.com/cdn/EP0688/CUSA06782_00/4Fn75AWWgOLZiFdxIA6HvSV5wC9c3WGp.png"
                                break;
                        }
                        return (<MainFeature1
                        subheading={<Subheading>{server[0]}</Subheading>}
                        heading={"Ark Server: "+post[forEachIndex].serverName+" is online!"}
                        description={"Game being played = "+post[forEachIndex].gameDescription}
                        description2={"on Map = "+post[forEachIndex].map}
                        description3={post[forEachIndex].numberOfPlayers+" / "+post[forEachIndex].maxNumberOfPlayers+" player"}
                        buttonRounded={false}
                        primaryButtonText="Join the Server!"
                        primaryButtonUrl={post[forEachIndex].connectUrl+"123/"}
                        imageSrc={buttonUrl}
                    />);}
        })}

        }


    </AnimationRevealPage>
  );
};