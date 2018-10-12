package com.touchpointsinc.payrollapp.representations;

import java.sql.Timestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Audit extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Column(name = "table_name")
    private String tableName;
    
    @NotNull
    @Column(name = "field_name")
    private String fieldName;
    
    @NotNull
    private String key;
    
    @Column(name = "old_value")
    private String oldValue;
    
    @Column(name = "new_value")
    private String newValue;

    public Audit() {
    	super(null);
    }

    public Audit(Long id, String tableName, String fieldName, String key, String oldValue, String newValue, Timestamp createTs) {
    	super(createTs);
        this.id = id;
        this.tableName = tableName;
        this.fieldName = fieldName;
        this.key = key;
        this.oldValue = oldValue; 
        this.newValue = newValue;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getOldValue() {
		return oldValue;
	}

	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}

	public String getNewValue() {
		return newValue;
	}

	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}	
}
