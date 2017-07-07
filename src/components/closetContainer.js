import React, { Component } from 'react';
import { Adaptors } from '../adaptors/index'
import SearchBar from './searchBar'
import TagList from './tagList'
import ItemsList from './itemsList'
import NewItemForm from './newItemForm'


export default class ClosetContainer extends Component{
  constructor(){
    super()
    this.state = {
      tags: [],
      items: [],
      searchTag: '',
      itemTags: [],
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.createTag = this.createTag.bind(this)
  }

  componentDidMount(){
    this.getItems()
    this.getTags()
  }

  // createItem(item){
  //   Adaptors.createItem(item)
  //   .then(item => this.setState((previousState) => {
  //       return {
  //         items: [...previousState.items, item]
  //       }
  //     })
  //   )
  // }

  createTag(item_url, tag){
    Adaptors.createTag(item_url, tag)
  }

  createItemTag(item_id, tag_id){
    Adaptors.createItemTag(item_id, tag_id)

  }

  onSubmit(searchTag){
    const tag = this.state.tags.filter( tag => tag.keyword === searchTag)[0]
    this.getItemTags(tag.id)
  }

  getItems() {
    Adaptors.Items()
    .then(items => this.setState({items}))
  }

  getTags(){
    Adaptors.Tags()
    .then(tags => this.setState({tags}))
  }

  getItemTags(tag_id){
    Adaptors.ItemsByTag(tag_id)
    .then(itemTags => this.setState({itemTags}))
  }

  render(){
    return(
      <div>
        <SearchBar tags={this.state.tags} onSubmit={this.onSubmit}/>
        <ItemsList itemTags={this.state.itemTags} />
        <NewItemForm tags={this.state.tags} getTags={this.getTags} onSubmitTag={this.createTag} onSubmitIDs={this.createItemTag} />
      </div>
    )
  }
}
