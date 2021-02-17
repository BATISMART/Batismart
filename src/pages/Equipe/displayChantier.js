import React, {Component}  from 'react';

import { Card, Form, Input, Icon, Button } from 'semantic-ui-react'


class Display extends Component {
	

	
	render() {
		console.log("tesdsqqmd,sqdet");
		return (
			
			<Form>
					
				<Form.Field inline id="chantierName">
				
					<label>Nom du chantier </label>
					
					<Input placeholder='NomChantier'/>
					
				</Form.Field>
				
				<div id="equipmentField">
				
					<Form.Field id = "0">
						
						<Card.Group>
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter un équipement
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											animated
											positive>
											<Button.Content visible>
												<Icon name='plus circle'/>
											</Button.Content>
											<Button.Content hidden>
												<Icon name='arrow circle right' />
											</Button.Content>
										</Button>
									</div>
								</Card.Content>
							</Card>
						</Card.Group>
						
					
					</Form.Field>
					
				</div>
				
			</Form>
		
		
		
		
			);
		
		
		
	}
	
	
	
	
	
	
}

export default Display;