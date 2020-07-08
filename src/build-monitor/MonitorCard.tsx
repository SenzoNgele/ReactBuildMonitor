import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import request from "request";
import bowser from "bowser";

const browser = bowser.getParser(window.navigator.userAgent);
const browserVersion = browser.getBrowser().version;

const useStyles = (theme: any) => ({
  root: {
    minWidth: 275,
  },
  up: {
    background: theme.palette.primary.main,
  },
  down: {
    background: theme.palette.primary.light,
  },
  other: {
    background: theme.palette.primary.dark,
  },
  notfound: {
    background: theme.palette.primary.light,
  },
});

class MonitorCard extends React.Component {
  state = {
    listOfEndPoints: [
      "https://status.gitlab.com/",
      "https://prima.run/health",
      "https://www.stackworx.io/",
      "https://www.google.com/",
      "https://www.gamestop.com/",
      "https://www.ticketmaster.com/",
    ],
    block: Array(6).fill({
      url: null,
      tempStatus: null,
      lastServerData: null,
    }),
    endPointData: Array(6).fill(null),
  };

  healthCheckStatus = (url: string, index: number) => {
    request({ uri: url, method: "GET" }, (error, response) => {
      let tempStatus: string | null = null;

      if (error) {
        tempStatus = "other";
      } else if (response.statusCode === 200) {
        tempStatus = "up";
      } else {
        tempStatus = "down";
      }

      this.setState((urlsState: any) => {
        const blockData = [...urlsState.block];
        const urlData = [...urlsState.endPointData];
        const data = {
          url,
          tempStatus,
          lastServerData: blockData[index].tempStatus,
        };

        blockData[index] = data;
        urlData[index] = tempStatus;

        return {
          block: blockData,
          urlData,
        };
      });
    });
  };

  serverHealthCheck = (endPoints: any) => {
    endPoints.map((url: any, index: number) => {
      return this.healthCheckStatus(url, index);
    });
  };

  componentDidMount() {
    if (browser.getBrowserName() === "Chrome" && browserVersion) {
      setInterval(() => {
        return this.serverHealthCheck(this.state.listOfEndPoints);
      }, 7000);
    }
  }

  render() {
    // @ts-ignore
    const { classes } = this.props;

    return browser.getBrowserName() !== "Chrome" && browserVersion ? (
      <CardContent className={classes.notfound}>
        <Typography variant="h1">Browser not supoorted</Typography>
      </CardContent>
    ) : (
      <Card className={classes.root}>
        {this.state.block.map((data, index) => {
          console.log("status ", data.tempStatus);
          return (
            // @ts-ignore
            <CardContent className={classes[data.tempStatus]} key={index}>
              <Typography variant="h1">{data.tempStatus}</Typography>
              <Typography variant="h1">{data.url}</Typography>
            </CardContent>
          );
        })}
      </Card>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(MonitorCard);
