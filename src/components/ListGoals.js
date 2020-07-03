import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Container} from "../styles/ListItem";
import RepoListItem from "../components/RepoListItem";
import Card from "../components/Card";
import List from "../styles/List";
import {merge} from "lodash";
import sortBy from "lodash/sortBy";

function ListGoals({goals, data}) {
  const goalsWithData = merge(goals.nodes, data);
  const [listGoals, setGoals] = useState(goalsWithData);

  const handleSort = (sortType) => {
    switch (sortType) {
      case "a_z":
        setGoals(sortBy(goalsWithData, "full_name"));
        break;
      case "z_a":
        setGoals(sortBy(goalsWithData, "full_name").reverse());
        break;
      case "most_stars":
        setGoals(sortBy(goalsWithData, "stargazers_count").reverse());
        break;
      case "fewest_stars":
        setGoals(sortBy(goalsWithData, "stargazers_count"));
        break;
      default:
        setGoals(goalsWithData);
    }
  };

  return (
    <Container>
      <select onChange={e => handleSort(e.currentTarget.value)}>
        <option value="Sort by">None</option>
        <option value="a_z">A to Z</option>
        <option value="z_a">Z to A</option>
        <option value="most_stars">Most Stars</option>
        <option value="fewest_stars">Fewest Stars</option>
      </select>
      <Card fitted>
        <List>
          {goalsWithData &&
            listGoals.map(goal => (
              <li key={goal.id}>
                <Link
                  to={{
                    pathname: `/repos/${goal.full_name.replace(/\s+/g, "")}/${goal.number}`,
                  }}>
                  <RepoListItem goal={goal} stars={goal.stargazers_count} />
                </Link>
              </li>
            ))}
        </List>
      </Card>
    </Container>
  );
}

export default ListGoals;
